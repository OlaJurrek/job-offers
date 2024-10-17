import prisma from "@/utils/prisma";
import Headline from "@/ui/dashboard/typography/Headline";
// import EditPositionForm from "@/ui/dashboard/forms/EditPositionForm";

export default async function EditPositionPage({
  params,
}: {
  params: { id: string };
}) {
  const position = await prisma.position.findUnique({
    where: {
      id: params.id,
    },
  });

  console.log(position);
  return (
    <>
      <Headline variant="h1">Edit Position</Headline>
      {/* TODO: Edit Form here */}
      {/* <EditPositionForm position={positionToEdit} /> */}
    </>
  );
}
