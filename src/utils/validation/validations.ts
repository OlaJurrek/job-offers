import { z } from "zod";

// Define the file size limit and accepted file types as constants
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/avif",
  "image/svg+xml",
  "image/webp",
];

export const positionSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  alt: z.string(),
  height: z.string(),
  width: z.string(),
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
    .optional()
    .nullable(),
});

export type PositionForm = z.infer<typeof positionSchema>;
