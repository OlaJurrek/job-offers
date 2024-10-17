import prisma from "@/utils/prisma";
import Image from "next/image";
import { UpdateButton } from "@/ui/dashboard/positions/buttons";

export default async function PositionList() {
  const positions = await prisma.position.findMany();
  console.log("data", typeof positions[0].createdAt);

  return (
    <ul>
      {positions.map((position) => (
        <li key={position.id}>
          <div>{position.name}</div>
          {position.image && (
            <div>
              {" "}
              <Image
                key={position.image}
                src={position.image}
                alt={position.alt || ""}
                // className="object-cover w-full"
                width={position.width || 100}
                height={position.height || 50}
              />
            </div>
          )}
          <UpdateButton id={position.id} />
        </li>
      ))}
    </ul>
  );
}
