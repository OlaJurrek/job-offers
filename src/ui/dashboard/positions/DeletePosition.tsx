import Action from "@/ui/dashboard/action/Action";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deletePosition } from "@/utils/actions/position-actions";

export default function DeletePosition({
  id,
  imageSrc,
}: {
  id: string;
  imageSrc: string;
}) {
  const deletePositionwithId = deletePosition.bind(null, id, imageSrc);

  return (
    <form action={deletePositionwithId}>
      <Action
        as="button"
        className="danger"
        icon={<TrashIcon />}
        hiddenLabel="Delete"
      />
    </form>
  );
}
