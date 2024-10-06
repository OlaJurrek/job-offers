import prisma from "@/utils/prisma";
import Image from "next/image";

export default async function Home() {
  const positions = await prisma.position.findMany();

  console.log(positions);

  return (
    <div>
      Home - Positions - (public)
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
                  width={670}
                  height={337}
                  alt="nic"
                  className="object-cover w-full"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap">
        {/* {images.map((image) => (
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
        ))} */}
      </div>
    </div>
  );
}
