import { z } from 'zod';

export const JournalEntrySchema = z.object({
  mood: z.number().min(1).max(5, 'Selecione um humor'),
  content: z.string().min(1, 'Escreva algo').max(2000, 'Máximo 2000 caracteres'),
  pillarType: z.enum(['health', 'intelligence', 'gold', 'strength']).optional(),
  isPrivate: z.boolean().default(false),
});

export type JournalEntryInput = z.infer<typeof JournalEntrySchema>;
