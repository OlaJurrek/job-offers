import { z } from "zod";

const MIN_LENGTH = 25;

export const OfferSchema = z.object({
  id: z.string(),
  active: z.boolean(),
  description: z
    .string()
    .min(MIN_LENGTH, { message: `Must be at least ${MIN_LENGTH} characters` }),
  requirements: z
    .string()
    .min(MIN_LENGTH, { message: `Must be at least ${MIN_LENGTH} characters` }),
  offer: z
    .string()
    .min(MIN_LENGTH, { message: `Must be at least ${MIN_LENGTH} characters` }),
});

export type Offer = z.infer<typeof OfferSchema>;
