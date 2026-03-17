import { z } from 'zod';

export const CreateRewardSchema = z.object({
  emoji: z.string().min(1, 'Escolha um emoji'),
  name: z.string().min(1, 'Nome é obrigatório').max(50, 'Máximo 50 caracteres'),
  costGold: z.number().min(1, 'Mínimo 1 ouro').max(10000, 'Máximo 10.000 ouro'),
});

export type CreateRewardInput = z.infer<typeof CreateRewardSchema>;
