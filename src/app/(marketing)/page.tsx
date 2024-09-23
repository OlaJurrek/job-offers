// import prisma from "@/utils/prisma";
import Image from "next/image";
import fs from "node:fs/promises";

export default async function Home() {
  // const positions = await prisma.position.findMany();
  const files = await fs.readdir("./public/uploads");
  const images = files
    // .filter((file) => file.endsWith(".jpg"))
    .map((file) => `/uploads/${file}`);

  return (
    <div>
      Home - Positions - (public)
      {/* <ul>
        {positions.map((position) => (
          <li key={position.id}>{position.name}</li>
        ))}
      </ul> */}
      <div className="flex flex-wrap">
        {images.map((image) => (
          <div key={image} className="px-2 h-auto w-1/2">
            <Image
              key={image}
              src={image}
              width={670}
              height={337}
              alt={image}
              className="object-cover w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
