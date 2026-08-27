import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); const router = Router();
router.get('/', async (_request, response, next) => { try { const mentors = await prisma.user.findMany({ where: { role: 'MENTOR' }, include: { mentorProfile: { include: { skills: true } } } }); response.json(mentors); } catch (error) { next(error); } });
router.get('/:id', async (request, response, next) => { try { const mentor = await prisma.user.findUnique({ where: { id: request.params.id }, include: { mentorProfile: { include: { skills: true } } } }); if (!mentor) return response.status(404).json({ error: 'Mentor not found' }); response.json(mentor); } catch (error) { next(error); } });
export default router;