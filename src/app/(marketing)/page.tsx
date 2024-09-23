import { prisma } from "@/utils/prisma";

export default async function Home() {
  const positions = await prisma.position.findMany();

  return (
    <div>
      Home - Positions - (public)
      <ul>
        {positions.map((position) => (
          <li key={position.id}>{position.name}</li>
        ))}
      </ul>
    </div>
  );
}
