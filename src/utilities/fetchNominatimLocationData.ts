import type {
  CoordinatePoint,
  LocationQuery,
} from '../types.js'

interface NominatimResult {
  lat?: string
  lon?: string
}

const NOMINATIM_URL =
  'https://nominatim.openstreetmap.org/search'

export async function fetchNominatimLocationData(
  query: LocationQuery,
): Promise<CoordinatePoint | null> {

  const addressParts = [
    query.postalCode,
    query.city,
    query.state,
    query.country,
  ].filter(Boolean)

  if (addressParts.length === 0) {
    return null
  }

  const params = new URLSearchParams({
    q: addressParts.join(', '),
    format: 'jsonv2',
    limit: '1',
  })

  const url =
    `${NOMINATIM_URL}?${params.toString()}`

  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'payload-location-fields/1.0',
    },
  })

  if (!response.ok) {
    throw new Error(
      `Nominatim request failed: ${response.status} ${response.statusText}`,
    )
  }

  const data =
    await response.json() as NominatimResult[]

  const result = data[0]

  if (!result) {
    return null
  }

  const latitude = Number(result.lat)
  const longitude = Number(result.lon)

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    return null
  }

  return {
    type: 'Point',

    coordinates: [
      longitude,
      latitude,
    ],
  }
}