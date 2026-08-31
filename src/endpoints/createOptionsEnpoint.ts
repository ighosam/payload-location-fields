import { type Endpoint } from 'payload'
import { getOptions } from '../queries/getOptions.js'

interface AddressFilters {
  country?: string
  state?: string
  city?: string
}

export const createOptionsEndpoint = (field: keyof AddressFilters): Endpoint => ({
  path: `/${field}`,
  method: 'get',
  handler: async (req) => {
    const filters: AddressFilters = {
      country: req.query?.country as string | undefined,
      //state: req.query?.province as string | undefined,
      state: req.query?.state as string | undefined,
      city: req.query?.city as string | undefined  
    }

    const rows = await getOptions(field, filters)
    
    return Response.json(rows)
  },
})