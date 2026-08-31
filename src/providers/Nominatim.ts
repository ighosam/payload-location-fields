import type {
  AutocompleteResult,
  GeocodeResult,
  GeocoderProvider,
} from './Provider.js'

type NominatimResult = {
  place_id: number
  display_name: string
  lat: string
  lon: string

  address?: {
    house_number?: string
    road?: string
    city?: string
    town?: string
    village?: string
    state?: string
    postcode?: string
    country?: string
  }
}

export const NominatimProvider = (): GeocoderProvider => {
  const baseUrl = 'https://nominatim.openstreetmap.org'

  const headers = {
    Accept: 'application/json',
    'User-Agent': 'payload-location-fields',
  }

  const toGeocodeResult = (
    result: NominatimResult,
  ): GeocodeResult => {
    const address = result.address ?? {}

    const latitude = Number(result.lat)
    const longitude = Number(result.lon)

    return {
      formatted: result.display_name,

      address: [
        address.house_number,
        address.road,
      ]
        .filter(Boolean)
        .join(' '),

      city:
        address.city ??
        address.town ??
        address.village ??
        '',

      province: address.state ?? '',

      postalCode: address.postcode ?? '',

      country: address.country ?? '',

      latitude,
      longitude,

      placeId: result.place_id.toString(),

      provider: 'nominatim',

      point: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    }
  }

  const geocode = async (
    address: string,
  ): Promise<GeocodeResult> => {
    const url = new URL(`${baseUrl}/search`)

    url.searchParams.set('q', address)
    url.searchParams.set('format', 'jsonv2')
    url.searchParams.set('addressdetails', '1')
    url.searchParams.set('limit', '1')

    const response = await fetch(url, {
      headers,
    })

    if (!response.ok) {
      throw new Error(
        `Nominatim returned ${response.status}`,
      )
    }

    const results =
      (await response.json()) as NominatimResult[]

    if (results.length === 0) {
      throw new Error('Address not found.')
    }

    return toGeocodeResult(results[0])
  }

  const reverse = async (
    latitude: number,
    longitude: number,
  ): Promise<GeocodeResult> => {
    const url = new URL(`${baseUrl}/reverse`)

    url.searchParams.set('lat', latitude.toString())
    url.searchParams.set('lon', longitude.toString())
    url.searchParams.set('format', 'jsonv2')
    url.searchParams.set('addressdetails', '1')

    const response = await fetch(url, {
      headers,
    })

    if (!response.ok) {
      throw new Error(
        `Nominatim returned ${response.status}`,
      )
    }

    const result =
      (await response.json()) as NominatimResult

    return toGeocodeResult(result)
  }

  const autocomplete = async (
    query: string,
  ): Promise<AutocompleteResult[]> => {
    if (!query.trim()) {
      return []
    }

    const url = new URL(`${baseUrl}/search`)

    url.searchParams.set('q', query)
    url.searchParams.set('format', 'jsonv2')
    url.searchParams.set('addressdetails', '1')
    url.searchParams.set('limit', '5')

    const response = await fetch(url, {
      headers,
    })

    if (!response.ok) {
      throw new Error(
        `Nominatim returned ${response.status}`,
      )
    }

    const results =
      (await response.json()) as NominatimResult[]

    return results.map((result) => ({
      id: result.place_id.toString(),
      label: result.display_name,
    }))
  }

  return {
    geocode,
    reverse,
    autocomplete,
  }
}