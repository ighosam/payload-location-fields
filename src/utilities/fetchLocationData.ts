export interface CoordinatePoint {
  type: 'Point'
  coordinates: [number, number] // [longitude, latitude]
}

export interface LocationQuery {
  postalCode?: string
  city?: string
  state?: string
  country?: string
}

interface NominatimResult {
  lat: string
  lon: string
}

const NOMINATIM_URL =
  'https://nominatim.openstreetmap.org/search'

/**
 * Search Nominatim using a postal code and optional
 * city/state/country information.
 *
 * Search rules:
 *
 * 1. postalCode + country
 * 2. postalCode + city + state + country
 *
 * City and state are treated as a pair. If either one
 * is missing, neither is included in the query.
 */
export async function fetchLocationData(
  query: LocationQuery,
): Promise<CoordinatePoint | null> {
  const {
    postalCode,
    city,
    state,
    country,
  } = query

  // Postal code is required for this search.
  if (!postalCode) {
    return null
  }

  const parts: string[] = []

  // Always start with the postal code.
  parts.push(postalCode.trim())

  // Only include city and state when BOTH are available.
  if (city?.trim() && state?.trim()) {
    parts.push(city.trim())
    parts.push(state.trim())
  }

  // Country is optional, but should normally be provided.
  if (country?.trim()) {
    parts.push(country.trim())
  }

  const searchQuery = parts.join(', ')

  const params = new URLSearchParams({
    q: searchQuery,
    format: 'jsonv2',
    addressdetails: '1',
    limit: '1',
  })

  try {
    const response = await fetch(
      `${NOMINATIM_URL}?${params.toString()}`,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'payload-location-fields',
        },
      },
    )

    if (!response.ok) {
      console.error(
        `Nominatim request failed: ${response.status} ${response.statusText}`,
      )

      return null
    }

    const results = (await response.json()) as NominatimResult[]

    if (!results.length) {
      return null
    }

    const result = results[0]

    const latitude = Number.parseFloat(result.lat)
    const longitude = Number.parseFloat(result.lon)

    // Protect against invalid coordinates.
    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      return null
    }

    return {
      type: 'Point',
      coordinates: [longitude, latitude],
    }
  } catch (error) {
    console.error(
      'Error while querying Nominatim:',
      error,
    )

    return null
  }
}