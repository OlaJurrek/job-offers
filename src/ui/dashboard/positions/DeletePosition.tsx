"use client";
import Action from "@/ui/dashboard/action/Action";
import { deletePosition } from "@/utils/actions/position-actions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";

type DeleteProps = {
  id: string;
  imageSrc: string;
};

export default function DeletePosition({ id, imageSrc }: DeleteProps) {
  const { handleSubmit } = useForm();

  function onSubmitForm() {
    // call the server action
    // const errorResponse = await createPosition(formData);
    deletePosition(id, imageSrc);
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Action
        as="button"
        className="danger"
        icon={<TrashIcon />}
        hiddenLabel="Delete"
      />
    </form>
  );
}
