import type {
  CoordinatePoint,
  LocationQuery,
} from '../types.js'

interface GeoapifyResponse {
  results?: Array<{
    lat?: number
    lon?: number

    country?: string
    country_code?: string
    state?: string
    city?: string
    postcode?: string

    formatted?: string
  }>
}

const GEOAPIFY_GEOCODING_URL =
  'https://api.geoapify.com/v1/geocode/search'

export async function fetchGeoapifyLocationData(
  query: LocationQuery,
  apiKey: string,
): Promise<CoordinatePoint | null> {

  if (
    !query.postalCode &&
    !query.city &&
    !query.state &&
    !query.country
  ) {
    return null
  }

  const params = new URLSearchParams()

  if (query.postalCode) {
    params.set(
      'postcode',
      query.postalCode.trim(),
    )
  }

  if (query.city) {
    params.set(
      'city',
      query.city.trim(),
    )
  }

  if (query.state) {
    params.set(
      'state',
      query.state.trim(),
    )
  }

  if (query.country) {
    params.set(
      'country',
      query.country.trim(),
    )
  }

  params.set('format', 'json')
  params.set('limit', '1')
  params.set('apiKey', apiKey)

  const url =
    `${GEOAPIFY_GEOCODING_URL}?${params.toString()}`

  console.log(
    'Geoapify request:',
    url.replace(apiKey, '***'),
  )

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Geoapify geocoding request failed: ${response.status} ${response.statusText}`,
    )
  }

  const data =
    await response.json() as GeoapifyResponse

  const result = data.results?.[0]

  if (!result) {
    console.log(
      'Geoapify returned no results',
    )

    return null
  }

  if (
    typeof result.lat !== 'number' ||
    typeof result.lon !== 'number'
  ) {
    return null
  }

  return {
    type: 'Point',

    // GeoJSON = [longitude, latitude]
    coordinates: [
      result.lon,
      result.lat,
    ],
  }
}