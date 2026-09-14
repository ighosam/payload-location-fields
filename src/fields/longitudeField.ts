import type { Field } from 'payload'

export const longitudeField: Field = {
  name: 'longitude',
  type: 'number',
  admin: {
    readOnly: true,
    components:{
       Field: 'payload-location-fields/admin/TextField#default'
    },
    custom:{
      name: 'Longitude',
    }
   
  },
}