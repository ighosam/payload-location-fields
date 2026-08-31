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


export const locationGroup: Field = {
  name: 'location',
  type: 'group',
  fields: [
    addressField,
    {
      type: 'row',
      fields: [
        withWidth(countryField),
        withWidth(provinceField),
      ],
    },

    {
      type: 'row',
      fields: [
        withWidth(cityField),
        withWidth(postalCodeField),   
      ],
    },
    {
      type: 'row',

      fields: [
        withWidth(latitudeField),
        withWidth(longitudeField),
      ],
    },

    formattedField,
    pointField,
  ],
}