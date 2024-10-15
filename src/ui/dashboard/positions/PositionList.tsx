import prisma from "@/utils/prisma";
import Image from "next/image";

export default async function PositionList() {
  const positions = await prisma.position.findMany();

  return (
    <ul>
      {positions.map((position) => (
        <li key={position.id}>
          <div>{position.name}</div>
          {position.imageSrc && (
            <div>
              {" "}
              <Image
                key={position.imageSrc}
                src={position.imageSrc}
                alt={position.imageAlt || ""}
                // className="object-cover w-full"
                width={position.imageWidth || 100}
                height={position.imageHeight || 50}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
