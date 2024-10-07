import fs from "node:fs/promises";
import crypto from "node:crypto";

export async function saveFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const hex = createHashFromBuffer(buffer);
  const extension = file.name.split(".")[1];
  const filePath = `./public/uploads/${hex}.${extension}`;
  await fs.writeFile(filePath, buffer);
  return `/uploads/${hex}.${extension}`;
}

function createHashFromBuffer(buffer: Uint8Array) {
  const hashSum = crypto.createHash("sha256");
  hashSum.update(buffer);
  return hashSum.digest("hex");
}
