import type { Field } from 'payload'

export const withWidth = (
  field: Field,
  width = '50%',
):Field => ({
  ...field,

  admin: {
    ...(field.admin ?? {}),
    width,
  },
}) as Field