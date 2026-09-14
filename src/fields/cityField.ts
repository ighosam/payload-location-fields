import type { Field } from 'payload'

export const cityField: Field = {
  name: 'city',
  type: 'text',
  required: false,

  admin: {
    //hidden:true,
    components:{
    //Field: 'payload-vehicle-fields/admin/VehicleMakeRouterField#default'
    Field: 'payload-location-fields/admin/AddrField#default'
    },
       custom: {
      //optionSource: '/api/car-db/make',
      endpoint: '/api/addr-field/city',
      name: 'City',
      dependsOn: ['country','state'],
    },
     // 👇 this is how the component knows where to load from
   condition: (_, siblingData) => Boolean(siblingData?.state) 
  },
}