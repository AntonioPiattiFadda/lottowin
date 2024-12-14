import { z } from 'zod';

export const prizeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  stock: z.number().min(0, 'Stock must be at least 0'),
  chance: z
    .number()
    .min(0, 'Chance must be at least 0')
    .max(100, 'Chance must be at most 100'),
  usdtEquivalence: z.number().min(0, 'USDT Equivalence must be at least 0'),
});

export const gameSchema = z.object({
  title: z.string().min(1, 'Game title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Invalid image URL'),
  size: z.string().min(1, 'Size is required'),
  nftAmount: z.number().int().min(1, 'NFT Amount must be at least 1'),
  commingSoon: z.boolean(),
  prizes: z.array(prizeSchema).refine((prizes) => {
    const titles = prizes.map((prize) => prize.title);
    const uniqueTitles = new Set(titles);
    return titles.length === uniqueTitles.size;
  }, 'Each prize must have a unique title'),
});
