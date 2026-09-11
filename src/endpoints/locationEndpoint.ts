import type { Endpoint } from 'payload'

import { fetchLocationData } from '../utilities/fetchLocationData.js'
import type { LocationQuery } from '../types.js'

export const locationEndpoint: Endpoint = {
  path: '/geo-location',
  method: 'get',

  handler: async (req) => {
    const url = new URL(
      req.url ?? 'http://localhost',
    )

    const postalCode =
      url.searchParams.get('postalCode') ?? undefined

    const city =
      url.searchParams.get('city') ?? undefined

    const state =
      url.searchParams.get('state') ?? undefined

    const country =
      url.searchParams.get('country') ?? undefined

    const query: LocationQuery = {
      postalCode,
      city,
      state,
      country,
    }

    try {
      const coordinates =
        await fetchLocationData(query)

      if (!coordinates) {
        return Response.json(
          {
            success: false,
            message: 'Location not found.',
          },
          {
            status: 404,
          },
        )
      }

      return Response.json({
        success: true,
        coordinates,
      })
    } catch (error) {
      console.error(
        'Location endpoint error:',
        error,
      )

      return Response.json(
        {
          success: false,
          message:
            error instanceof Error
              ? error.message
              : 'Geocoding failed.',
        },
        {
          status: 500,
        },
      )
    }
  },
}