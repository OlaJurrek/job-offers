"use server";
import prisma from "@/utils/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { positionSchema } from "../validation/validations";
import { saveFile } from "./actions-helpers";

function transformZodErrors(error: z.ZodError) {
  return error.issues.map(({ message, path }) => ({
    message,
    input: path.join("."),
  }));
}

export async function createPosition(formData: FormData) {
  // Check if optional image is in the formData
  let image: FormDataEntryValue | null = formData.get("image");
  if (image === "null") {
    image = null;
  }

  // Save image in uploads
  let imageSrc: string = "";
  if (image instanceof File) {
    imageSrc = await saveFile(image);
  }

  // Validate the formData
  const validatedFields = positionSchema.safeParse({
    name: formData.get("name"),
    // image: formData.get("image"), // for error testing
    image,
  });

  if (validatedFields.success) {
    // Send validated data to database
    const name = validatedFields.data.name;
    try {
      await prisma.position.create({
        data: {
          name,
          imageSrc,
        },
      });
    } catch (error) {
      // If a database error occurs, return a more specific error.
      console.error("error", error);
      return { message: "Database error: Failed to create position." };
    }
    // Revalidate the cache for the positions pages and redirect the user.
    revalidatePath("/");
    revalidatePath("/admin/positions");
    redirect("/admin/positions");
  } else {
    // Handle errors
    return transformZodErrors(validatedFields.error);
  }
}
