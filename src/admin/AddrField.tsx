'use client'
import { useEffect, useState } from 'react'
import {SelectInput, useField } from '@payloadcms/ui'
import type { FieldClientComponent } from 'payload'


type Option = {
  label: string
  value: string
}

const AddrField:FieldClientComponent = (props) => {
  const [options, setOptions] = useState<Option[]>([])

  const path = props.path as string

  const field = useField<string>({ path })

  const country = useField({ path: 'location.country' }).value
  const state = useField({ path: 'location.state' }).value
  const city = useField({ path: 'location.city' }).value
  
   //const fields = useFormFields(([fields])=>fields)

 
  const endpoint = props.field.admin?.custom?.endpoint
  const value = {country,state,city}

 type stringMap = 
                  'country'|
                  'state'|
                  'city'
                  

  useEffect(() => {
    const controller = new AbortController()


const loadOptions = async () => {

  let filters = {}


///////
  const dependsOn = props.field.admin?.custom?.dependsOn
console.log("depends on is: ",dependsOn)
  console.log('the endpoint is: ',endpoint)

  const entries = dependsOn.map((res:stringMap) =>[res,value[res]])
console.log(entries,null,2)

  filters = Object.fromEntries(
  entries
 )
  
//////

console.log(JSON.stringify(filters,null,2))

  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value != null && value !== '') {
      params.append(key, String(value))
    }
  })
   
  try {
    console.log('New Params is:', params.toString())
    console.log('Params is:', params.toString())

    const res = await fetch(`${endpoint}?${params.toString()}`, {
      signal: controller.signal,
    })

    const data: Option[] = await res.json()

    setOptions(data)

    if (
      field.value &&
      !data.some(option => option.value === field.value)
    ) {
      field.setValue('')
    }
  } catch (err) {
    if ((err as Error).name !== 'AbortError') {
      console.error(err)
    }
  }
}

    loadOptions()

    return () => controller.abort()
  }, [
    country,
    state,
    city,
   
  ])

  return (
  <SelectInput
      label={props.field.admin?.custom?.name}
      path={field.path}
      name={field.path}
      value={field.value}
      options={options}
      onChange={(option) =>
      field.setValue((option as Option).value)
      }
      style={{ width: '40%' }}
    />
)
  
}

export default AddrField