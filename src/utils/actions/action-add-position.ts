"use server";

import { formSchema } from "../../utils/validation/add-position";
import { z } from "zod";
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";

export const transformZodErrors = (error: z.ZodError) => {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
};

export async function submitForm(formData: FormData) {
  try {
    // fake a delay
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // for (const [key, value] of formData) {
    //   console.log("key", `${key} ${value}`);
    // }

    //validate the FormData
    const validatedFields = formSchema.parse({
      name: formData.get("name"),
      description: formData.get("description"),
      private: formData.get("private") === "true" ? true : false,
      cover: formData.get("image"),
    });

    const file = formData.get("image") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    console.log("file", buffer);

    await fs.writeFile(`./public/uploads/${file.name}`, buffer);

    revalidatePath("/");

    console.log("fields", validatedFields.image);

    // send validated data to database here

    return {
      errors: null,
      data: "data received and mutated",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        errors: transformZodErrors(error),
        data: null,
      };
    }

    return {
      errors: {
        message: "An unexpected error occurred. Could not create shelf.",
      },
      data: null,
    };
  }
}
