import { z } from 'zod';

export const CreateTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100, 'Máximo 100 caracteres'),
  description: z.string().max(500, 'Máximo 500 caracteres').optional(),
  pillarType: z.enum(['health', 'intelligence', 'gold', 'strength'], { error: 'Escolha um pilar' }),
  difficulty: z.enum(['easy', 'medium', 'hard', 'epic']).default('medium'),
  dueDate: z.string().optional(),
  isRecurring: z.boolean().default(false),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
