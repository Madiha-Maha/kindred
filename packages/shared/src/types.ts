export type Role = 'MENTOR' | 'LEARNER';
export type SessionMode = 'VIDEO' | 'IN_PERSON';
export type SessionStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface MentorSummary { id: string; name: string; bio: string | null; avatarUrl: string | null; skills: string[]; ratePerSession: number; }
export interface ApiUser { id: string; email: string; name: string; role: Role; }