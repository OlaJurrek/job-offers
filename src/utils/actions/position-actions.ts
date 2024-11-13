"use server";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UploadedPositionSchema } from "../definitions/position";
import { saveFile, deleteFile } from "./actions-helpers";

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

// TODO sporo powtórzen kodu, mozna by moze zrobic refactoring i jakies funkcje pomocnicze wyodrebnic

export async function createPosition(formData: FormData) {
  // Check if optional image is in the formData
  let uploadedImage: FormDataEntryValue | null = formData.get("image");
  if (uploadedImage === "null") uploadedImage = null;

  // Save image in uploads
  let image: string = "";
  if (uploadedImage instanceof File) image = await saveFile(uploadedImage);

  // Validate the formData
  const validatedFields = UploadedPositionSchema.safeParse({
    name: formData.get("name"),
    // uploadedImage: formData.get("image"), // for testing server validation
    image: uploadedImage,
    alt: formData.get("alt"),
    height: Number(formData.get("height")),
    width: Number(formData.get("width")),
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
    const height = validatedFields.data.height;
    const width = validatedFields.data.width;
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

export async function updatePosition(
  id: string,
  isImageChanged: boolean,
  oldImageSrc: string,
  formData: FormData
) {
  // Handle operation on images
  let image: string = "";
  let uploadedImage: FormDataEntryValue | null = null;

  if (!isImageChanged) {
    image = oldImageSrc;
  } else {
    deleteFile(oldImageSrc);
    uploadedImage = formData.get("image");
    if (uploadedImage === "null") uploadedImage = null;
    if (uploadedImage instanceof File) image = await saveFile(uploadedImage);
  }

  // Validate the formData
  const validatedFields = UploadedPositionSchema.safeParse({
    name: formData.get("name"),
    // image: formData.get("image"), // for testing server validation
    image: uploadedImage,
    alt: formData.get("alt"),
    height: Number(formData.get("height")),
    width: Number(formData.get("width")),
  });

  if (!validatedFields.success) {
    // Handle validation errors
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        "Failed to update position. See individual fields errors for further instructions.",
    };
  } else {
    // Send validated data to database
    const name = validatedFields.data.name;
    const alt = validatedFields.data.alt;
    const height = validatedFields.data.height;
    const width = validatedFields.data.width;
    try {
      const updatedPosition = await prisma.position.update({
        where: {
          id: id,
        },
        data: {
          name,
          image,
          alt,
          height,
          width,
        },
      });

      console.log("updatedPosition", updatedPosition);
      // TODO Moze wyswietlic toast, ze position has been successfully updated

      // throw new Error("database error"); // // for testing only
    } catch (error) {
      // If a database error occurs, return a more specific error.
      console.error("error", error);
      return {
        message: "Failed to update position. A database error occured.",
      };
    }
    // Revalidate the cache for the positions pages and redirect the user.
    revalidatePath("/");
    revalidatePath("/admin/positions");
    redirect("/admin/positions");
  }
}

export async function deletePosition(id: string, imageSrc: string) {
  // Toast się powinien pokazywać, ze position zostalo usuniete (i jakie)

  deleteFile(imageSrc);

  try {
    await prisma.position.delete({
      where: {
        id: id,
      },
    });
    // TODO pokazać w poście deletedPosition
    revalidatePath("/");
    revalidatePath("/admin/positions");
    return { message: "Deleted Position" };
  } catch (error) {
    console.warn(error);
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}
