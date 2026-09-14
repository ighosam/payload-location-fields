
'use client'

import React from 'react'
import { TextInput, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

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
      console.log('I AM ABOUT TO CALL THE API')

      const params = new URLSearchParams({
        postalCode,
        country: countryValue,
      })

      if (city?.trim()) {
        params.set('city', city.trim())
      }

      if (state?.trim()) {
        params.set('state', state.trim())
      }

      const response = await fetch(`/api/geo-location?${params.toString()}`)

      if (!response.ok) {
        throw new Error(`Location API returned ${response.status}`)
      }

      const location = await response.json()

      console.log('Location2:',location.coordinates.coordinates)

      if (location?.coordinates) {
        setLongitude(location.coordinates.coordinates[0])
        setLatitude(location.coordinates.coordinates[1])
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
         style={{ width: '100%' }}
      />
    </div>
  )
}

export default PostalCodeField