import fs from "node:fs/promises";
import crypto from "node:crypto";

export async function saveFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const uuid = crypto.randomUUID();
  const extension = file.name.split(".")[1];
  const filePath = `./public/uploads/${uuid}.${extension}`;
  await fs.writeFile(filePath, buffer);
  return `/uploads/${uuid}.${extension}`;
}

export async function deleteFile(imageSrc: string) {
  if (!imageSrc) {
    return;
  }

  const path = `./public${imageSrc}`;
  const stats = await fs.stat(path);

  if (!stats.isFile()) {
    return;
  }

  try {
    fs.unlink(path);
  } catch (error) {
    console.log("err", error);
    // TODO Toast nie mozna usunac pliku
  }
}
