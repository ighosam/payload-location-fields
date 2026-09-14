import type { Field } from 'payload'

export const latitudeField: Field = {
  name: 'latitude',
  type: 'number',
  admin: {
    readOnly: true,
    components:{
       Field: 'payload-location-fields/admin/TextField#default'
    },
    custom:{
      name: 'Latitude',
    }
   
  },
}