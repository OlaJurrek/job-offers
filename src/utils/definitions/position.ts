import { z } from "zod";
// import { Offer } from "./offer";

// Define the file size limit and accepted file types as constants
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/avif",
  "image/svg+xml",
  "image/webp",
];

const CommonPostion = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  alt: z.string(),
  height: z.number(),
  width: z.number(),
});

export const UploadedPositionSchema = CommonPostion.extend({
  image: z
    .instanceof(File)
    // .any()
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024} MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      `Only the following image types are allowed: ${ACCEPTED_IMAGE_TYPES.join(
        ", "
      )}.`
    )
    .nullable(),
});

export type UploadedPosition = z.infer<typeof UploadedPositionSchema>;

export const PositionSchema = CommonPostion.extend({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  image: z.string().nullable(),
});

export const PositionToEditSchema = PositionSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type PositionToEdit = z.infer<typeof PositionToEditSchema>;

type PositionWithoutOffers = z.infer<typeof PositionSchema>;

export type Position = PositionWithoutOffers & {
  // offers: Offer[];
};
