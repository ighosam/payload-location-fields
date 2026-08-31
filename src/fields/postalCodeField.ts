import type { Field } from 'payload'

export const postalCodeField: Field = {
  name: 'postalCode',
  type: 'text',
  label: 'Postal Code',

   admin: {  
    components:{

    //Field: 'payload-vehicle-fields/admin/VehicleMakeRouterField#default'
    Field: 'payload-location-fields/admin/PostalCodeField#default'
    
    },
       custom: {
      //optionSource: '/api/car-db/make',
      endpoint: '/api/addr-field/state',
      name: 'Province/State',
      dependsOn: ['country'],
    },
     // 👇 this is how the component knows where to load from
    condition: (_, siblingData) => Boolean(siblingData?.country)
  },
}