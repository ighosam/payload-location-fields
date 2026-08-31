import type { Field } from 'payload'

export const countryField: Field = {
  name: 'country',
  type: 'text',
  
  admin: {   
    components:{
   
    //Field: 'payload-vehicle-fields/admin/VehicleMakeRouterField#default'
    Field: 'payload-location-fields/admin/AddrField#default'
    
    },
    
       custom: {
      //optionSource: '/api/car-db/make',
      endpoint: '/api/addr-field/country',
      name: 'Country',
      dependsOn: [],
    },
     // 👇 this is how the component knows where to load from
     
  },
}