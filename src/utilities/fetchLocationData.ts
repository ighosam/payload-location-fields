import type {
  CoordinatePoint,
  LocationQuery,
} from '../types.js'

import { fetchGoogleLocationData } from './fetchGoogleLocationData.js'
import { fetchGeoapifyLocationData } from './fetchGeoapifyLocationData.js'
import { fetchNominatimLocationData } from './fetchNominatimLocationData.js'

export async function fetchLocationData(
  query: LocationQuery,
): Promise<CoordinatePoint | null> {

  const provider = process.env.GEOCODING_PROVIDER ?? 'nominatim'
  const apiKey = process.env.GEOCODING_API_KEY

  switch (provider) {

    case 'google':
      if (!apiKey) {
        throw new Error(
          'Google geocoding requires GEOCODING_API_KEY.',
        )
      }

      return fetchGoogleLocationData(
        query,
        apiKey,
      )

    case 'geoapify':
      if (!apiKey) {
        throw new Error(
          'Geoapify geocoding requires GEOCODING_API_KEY.',
        )
      }

      return fetchGeoapifyLocationData(
        query,
        apiKey,
      )

    case 'nominatim':
      return fetchNominatimLocationData(query)

    default:
      throw new Error(
        `Unsupported geocoding provider: ${provider}`,
      )
  }
}