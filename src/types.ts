import type { Plugin } from 'payload'

import type { GeocoderProvider } from './providers/Provider.js'

export type ProviderName =
  | 'google'
  | 'mapbox'
  | 'nominatim'

export interface LocationPluginOptions {

  collections: string[]

  provider?: ProviderName | GeocoderProvider

  apiKey?: string

  defaultCountry?: string

  enableAutocomplete?: boolean

  enableBrowserLocation?: boolean

  enableMap?: boolean
}

export type LocationPlugin = (
  options: LocationPluginOptions
) => Plugin