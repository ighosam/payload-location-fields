import { CollectionConfig } from 'payload';
import { createOptionsEndpoint } from '../endpoints/createOptionsEnpoint.js';
import { locationEndpoint } from '../endpoints/locationEndpoint.js';

const country = createOptionsEndpoint('country')
const state = createOptionsEndpoint('state')
const city = createOptionsEndpoint('city')


export const AddressFields: CollectionConfig = {
  slug: 'addr-field',
  access: {
    read: () => true, // Adjust permissions as needed
    create: () => true, // Disable creating documents if you only want endpoints
    update: () => true,
    delete: () => true,
  },
  admin: {
    hidden: true, // Hide from admin panel if you don't need UI
  },
  // No fields defined - completely empty collection
  fields: [],
  endpoints:[
   country,
   state,
   city,
   //locationEndpoint
  ]
}