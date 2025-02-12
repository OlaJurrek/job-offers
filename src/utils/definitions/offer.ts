import { z } from "zod";

const MIN_LENGTH = 25;

export const UploadedOfferSchema = z.object({
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

export const OfferDBSchema = UploadedOfferSchema.extend({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UploadedOffer = z.infer<typeof UploadedOfferSchema>;
