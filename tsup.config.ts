import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    
    'admin/AddrField': 'src/admin/AddrField.tsx',
    'admin/AFields': 'src/admin/AFields.tsx',
    'admin/PostalCodeField': 'src/admin/PostalCodeField.tsx',
    'admin/TextField': 'src/admin/TextField.tsx'
  },
  format: ['esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
    external: [
    'payload',
    '@payloadcms/ui',
    'react',
    'react-dom',
  ],
})