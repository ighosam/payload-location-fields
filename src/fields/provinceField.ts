import type { Field } from 'payload'

export const provinceField: Field = {
  name: 'state',
  type: 'text',
  label: 'Province / State',

  admin: { 
    //hidden:true, 
    components:{

    //Field: 'payload-vehicle-fields/admin/VehicleMakeRouterField#default'
    Field: 'payload-location-fields/admin/AddrField#default'
    
    },
       custom: {
      endpoint: '/api/addr-field/state',
      name: 'Province/State',
      dependsOn: ['country'],
    },
     // 👇 this is how the component knows where to load from
    condition: (_, siblingData) => Boolean(siblingData?.country)
  },
}