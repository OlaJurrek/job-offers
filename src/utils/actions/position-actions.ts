"use server";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UploadedPositionSchema } from "../definitions/position";
import { saveFile } from "./actions-helpers";

export type Response = {
  errors?: {
    name?: string[];
    image?: string[];
    alt?: string[];
    height?: string[];
    width?: string[];
  };
  message?: string | null;
};

export async function createPosition(formData: FormData) {
  // Check if optional image is in the formData
  let uploadedImage: FormDataEntryValue | null = formData.get("image");
  if (uploadedImage === "null") {
    uploadedImage = null;
  }

  // Save image in uploads
  let image: string = "";
  if (uploadedImage instanceof File) {
    image = await saveFile(uploadedImage);
  }

  // Validate the formData
  const validatedFields = UploadedPositionSchema.safeParse({
    name: formData.get("name"),
    // uploadedImage: formData.get("image"), // for testing server validation
    image: uploadedImage,
    alt: formData.get("alt"),
    height: formData.get("height"),
    width: formData.get("width"),
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
    const alt = validatedFields.data.alt;
    const height = Number(validatedFields.data.height);
    const width = Number(validatedFields.data.width);
    try {
      await prisma.position.create({
        data: {
          name,
          image,
          alt,
          height,
          width,
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
