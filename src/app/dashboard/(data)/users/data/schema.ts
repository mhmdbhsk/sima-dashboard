import { z } from 'zod'

export const usersSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  id_number: z.string(),
  email: z.string(),
})

export type Users = z.infer<typeof usersSchema>
