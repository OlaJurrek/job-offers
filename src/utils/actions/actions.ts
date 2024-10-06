"use server";
import prisma from "@/utils/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { positionSchema } from "../validation/validations";
import fs from "node:fs/promises";
import crypto from "node:crypto";

export const transformZodErrors = (error: z.ZodError) => {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
};

export async function createPosition(formData: FormData) {
  try {
    //validate the FormData
    const validatedFields = positionSchema.safeParse({
      name: formData.get("name"),
      image: formData.get("image"),
    });

    const file = formData.get("image") as File;

    const arrayBuffer = await file.arrayBuffer();
    const hashSum = crypto.createHash("sha256");
    const buffer = new Uint8Array(arrayBuffer);
    hashSum.update(buffer);
    const hex = hashSum.digest("hex");
    const extension = file.name.split(".")[1];

    const filePath = `./public/uploads/${hex}.${extension}`;
    const absoluteFilePath = `/uploads/${hex}.${extension}`;

    await fs.writeFile(filePath, buffer);

    // send validated data to database here

    if (validatedFields.success) {
      const name = validatedFields.data.name;
      await prisma.position.create({
        data: {
          name,
          imageSrc: absoluteFilePath,
        },
      });

      revalidatePath("/");
    }

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
