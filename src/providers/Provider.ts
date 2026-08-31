export type GeocodeResult = {
  formatted: string

  address: string
  city: string
  province: string
  postalCode: string
  country: string

  latitude: number
  longitude: number

  placeId: string

  provider: string

  point: {
    type: 'Point'
    coordinates: [number, number] // [longitude, latitude]
  }
}

export interface AutocompleteResult {

  id: string

  label: string
}

export interface GeocoderProvider {

  geocode(
    address: string
  ): Promise<GeocodeResult>

  reverse(
    latitude: number,
    longitude: number,
  ): Promise<GeocodeResult>

  autocomplete(
    query: string,
  ): Promise<AutocompleteResult[]>
}