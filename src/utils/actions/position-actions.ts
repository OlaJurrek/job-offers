"use server";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { positionSchema } from "../validation/validations";
import { saveFile } from "./actions-helpers";

export type Response = {
  errors?: {
    name?: string[];
    image?: string[];
  };
  message?: string | null;
};

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
    // image: formData.get("image"), // for testing server validation
    image,
  });

  if (!validatedFields.success) {
    // Handle validation errors
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Failed to create position. See individual fields errors for further instructions.",
    };
  } else {
    // Send validated data to database
    const name = validatedFields.data.name;
    try {
      await prisma.position.create({
        data: {
          name,
          imageSrc,
        },
      });
      // throw new Error("database error"); // // for testing only
    } catch (error) {
      // If a database error occurs, return a more specific error.
      console.error("error", error);
      return {
        message: "Failed to create position. A database error occured.",
      };
    }
    // Revalidate the cache for the positions pages and redirect the user.
    revalidatePath("/");
    revalidatePath("/admin/positions");
    redirect("/admin/positions");
  }
}
