import { z } from 'zod';

export const TokenSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(['user', 'guest', 'viewer', 'admin']),
  eventId: z.string().optional(),
  editable: z.boolean().optional(),
  collab: z.boolean().optional()
});
