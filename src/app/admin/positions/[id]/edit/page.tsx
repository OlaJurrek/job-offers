import prisma from "@/utils/prisma";
import Headline from "@/ui/dashboard/typography/Headline";
import EditPositionForm from "@/ui/dashboard/forms/EditPositionForm";
import { PositionToEdit } from "@/utils/definitions/position";

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

  // let positionToEdit: PositionToEdit;

  // if (position) {
  const positionToEdit: PositionToEdit = {
    id: position?.id || "",
    name: position?.name || "",
    image: position?.image,
    alt: position?.alt || "",
    width: position?.width || 0,
    height: position?.height || 0,
  };
  // }

  console.log("edit me", positionToEdit);
  return (
    <>
      <Headline variant="h1">Edit Position</Headline>
      {/* TODO: Edit Form here */}
      {position && <EditPositionForm position={positionToEdit} />}
    </>
  );
}
