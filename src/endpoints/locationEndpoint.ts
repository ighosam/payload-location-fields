
import type { Endpoint } from 'payload'
import { fetchLocationData } from '../utilities/fetchLocationData.js'

export const locationEndpoint: Endpoint = {
  path: '/location',
  method: 'get',

  handler: async (req) => {
    const postalCode = req.query?.postalCode
    const country = req.query?.country

    if (
      typeof postalCode !== 'string' ||
      typeof country !== 'string' ||
      !postalCode ||
      !country
    ) {
      return Response.json(
        {
          error: 'postalCode and country are required',
        },
        {
          status: 400,
        },
      )
    }

    try {
      const data = await fetchLocationData({
        postalCode,
        country,
      })

      return Response.json(data, {
        status: 200,
      })
    } catch (error) {
      console.error('Error fetching location data:', error)

      return Response.json(
        {
          error: 'Error fetching location data',
        },
        {
          status: 500,
        },
      )
    }
  },
}

