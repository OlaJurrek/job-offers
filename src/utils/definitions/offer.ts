import { z } from "zod";

export const OfferSchema = z.object({
  id: z.string(),
});

export type Offer = z.infer<typeof OfferSchema>;
