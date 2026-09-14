'use client'

import React from 'react'
import { TextInput, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

const TextField: TextFieldClientComponent = (props) => {
  const path = props.path as string

 const { value, setValue } = useField<string>({
    path,
  })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }
   const isReadOnly = () => {
    if(
      props.field.admin?.custom?.name === 'Longitude'
      || props.field.admin?.custom?.name === 'Latitude'
      ){return true}

    return false
   }
  

  return (
      <TextInput
       label={props.field.admin?.custom?.name}
        path={path}
        value={value || ''}
        onChange={handleChange}
         style={{ width: '40%' }}
         readOnly={isReadOnly()}      
      />
  
  )
  
/*
  return ( 
      <TextInput 
      path={path} 
      label="unknown" 
      style={{ width: '100%' }} /> 
    )
*/

}

export default TextField