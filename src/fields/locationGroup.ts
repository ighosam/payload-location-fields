import type { Field } from 'payload'
import { addressField } from './addressField.js'
import { cityField } from './cityField.js'
import { provinceField } from './provinceField.js'
import { postalCodeField } from './postalCodeField.js'
import { countryField } from './countryField.js'
import { latitudeField } from './latitudeField.js'
import { longitudeField } from './longitudeField.js'
import { formattedField } from './formattedField.js'
import { pointField } from './pointField.js'

import { withWidth } from '../utilities/withWidth.js'

const halfWidth = (field: Field): Field => ({
  ...field,
  admin: {
    ...(field as any).admin,
    width: '100%',
    style: {
          width: '100%',
        },
  },
})


export const locationGroup: Field = {
  name: 'location',
  type: 'group',
  
  fields: [
    withWidth(addressField),
    {
      type: 'row',
      fields: [
        halfWidth(countryField),
        halfWidth(provinceField),
      ],
    },

    {
      type: 'row',
      fields: [
        halfWidth(cityField),
        halfWidth(postalCodeField),   
      ],
    },
    {
      type: 'row',
      fields: [
        halfWidth(latitudeField),
        halfWidth(longitudeField),
      ],
    },

    //formattedField,
    //pointField,
  ],
}