import type { Plugin,Config } from 'payload'

import { locationGroup } from './fields/locationGroup.js'
import type { LocationPluginOptions } from './types.js'
import { AddressFields } from './collections/AddressFields.js' 

export const payloadLocationFieldsPlugin =
  (options: LocationPluginOptions):Plugin =>
  (incomingConfig: Config): Config => ({
      ...incomingConfig,
      collections: [
        ...(incomingConfig.collections || []).map((collection) => {
          console.log(collection.slug)
          //if (collection.slug !== options.slug) return collection
          if (!options.collections.includes(collection.slug)) return collection
          return {
            ...collection,
            fields: [
              ...(collection.fields || []),
              locationGroup,      
            ],
            //endpoints:[]
          }
        }),
        AddressFields,
      ],
    
  })

