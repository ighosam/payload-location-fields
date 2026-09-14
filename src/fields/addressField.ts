import type { Field } from 'payload'

export const addressField: Field = {
  name: 'address',
  type: 'text',
  required: false,
  admin: {
    readOnly: true,
    components:{
       Field: 'payload-location-fields/admin/TextField#default'
    },
    custom:{
      name: 'Street Address',
    }
   
  },
}