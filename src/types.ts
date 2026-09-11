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

export type GeocodingProvider =
  | 'google'
  | 'geoapify'
  | 'nominatim'


export interface LocationPluginOptions {
  collections: string[]
}
/*
export interface GeocodingOptions {
  provider?: GeocodingProvider
  apiKey?: string
}
  */