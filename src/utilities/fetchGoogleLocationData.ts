import type {
  CoordinatePoint,
  LocationQuery,
} from '../types.js'

interface GoogleGeocodingResponse {
  status: string

  results?: Array<{
    geometry?: {
      location?: {
        lat?: number
        lng?: number
      }
    }
  }>

  error_message?: string
}

const GOOGLE_GEOCODING_URL =
  'https://maps.googleapis.com/maps/api/geocode/json'

export async function fetchGoogleLocationData(
  query: LocationQuery,
  apiKey: string,
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

  const address = addressParts.join(', ')

  const params = new URLSearchParams({
    address,
    key: apiKey,
  })

  const url =
    `${GOOGLE_GEOCODING_URL}?${params.toString()}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Google geocoding request failed: ${response.status} ${response.statusText}`,
    )
  }

  const data =
    await response.json() as GoogleGeocodingResponse

  if (data.status !== 'OK') {
    console.error(
      'Google geocoding error:',
      data.status,
      data.error_message,
    )

    return null
  }

  const location =
    data.results?.[0]?.geometry?.location

  if (
    !location ||
    typeof location.lat !== 'number' ||
    typeof location.lng !== 'number'
  ) {
    return null
  }

  return {
    type: 'Point',

    // GeoJSON uses [longitude, latitude]
    coordinates: [
      location.lng,
      location.lat,
    ],
  }
}