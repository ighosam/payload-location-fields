'use client'

import type { FieldClientComponent} from 'payload'
import AddrField from './AddrField.js'


const AFields:FieldClientComponent = (props) => {


 // const source = useField({ path: 'location.country' })

 return <AddrField {...props} /> 
}
export default AFields