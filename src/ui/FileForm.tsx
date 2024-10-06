"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the file size limit and accepted file types as constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 3MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const fileSchema = z.object({
  image: z
    .any()
    .refine(
      (file) => file[0].size <= MAX_FILE_SIZE,
      `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0].type),
      `Only the following image types are allowed: ${ACCEPTED_IMAGE_TYPES.join(
        ", "
      )}.`
    )
    .optional()
    .nullable(),
});

type FileSchema = z.infer<typeof fileSchema>;

export default function FileForm() {
  const form = useForm<FileSchema>({
    resolver: zodResolver(fileSchema),
  });

  const onSubmit = (data: any) => {
    console.log("file form", data);
  };

  console.log(form.formState.errors);
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input type="file" {...form.register("image")} />
      <button>Submit</button>
    </form>
  );
}
