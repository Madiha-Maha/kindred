import { z } from 'zod';

export const roleSchema = z.enum(['MENTOR', 'LEARNER']);
export const registerSchema = z.object({ email: z.string().email(), password: z.string().min(8), name: z.string().min(2), role: roleSchema });
export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
export const createSessionSchema = z.object({ mentorId: z.string().min(1), skillId: z.string().min(1), scheduledAt: z.string().datetime(), mode: z.enum(['VIDEO', 'IN_PERSON']) });
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateSessionInput = z.infer<typeof createSessionSchema>;