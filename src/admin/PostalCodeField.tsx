
'use client'

import React from 'react'
import { TextInput, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { fetchLocationData } from '../utilities/fetchLocationData.js'

const PostalCodeField: TextFieldClientComponent = (props) => {
  const path = props.path as string

  const country = useField<string>({
    path: 'location.country',
  }).value

  const state = useField<string>({
    path: 'location.state',
  }).value

  const city = useField<string>({
    path: 'location.city',
  }).value

  const { setValue: setLatitude } = useField<number>({
    path: 'location.latitude',
  })

  const { setValue: setLongitude } = useField<number>({
    path: 'location.longitude',
  })

  const { value, setValue } = useField<string>({
    path,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      const input = e.currentTarget.querySelector('input')

      if (input) {
        input.blur()
      }
    }
  }

  const handleBlur = async (e: React.FocusEvent<HTMLDivElement>) => {
    // Ignore blur events when focus moves between elements
    // inside this component.
    if (
      e.relatedTarget instanceof Node &&
      e.currentTarget.contains(e.relatedTarget)
    ) {
      return
    }

    const postalCode = value?.trim()
    const countryValue = country?.trim()

    if (!postalCode || !countryValue) {
      return
    }

    try {
      const location = await fetchLocationData({
        postalCode,
        country: countryValue,
        ...(city?.trim() ? { city: city.trim() } : {}),
        ...(state?.trim() ? { state: state.trim() } : {}),
      })

      console.log('Location:', location)

      if (location) {
        setLongitude(location.coordinates[0])
        setLatitude(location.coordinates[1])
      }
    } catch (error) {
      console.error('Error fetching location data:', error)
    }
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <TextInput
        path={path}
        label="Postal Code"
        value={value || ''}
        onChange={handleChange}
      />
    </div>
  )
}

export default PostalCodeField
