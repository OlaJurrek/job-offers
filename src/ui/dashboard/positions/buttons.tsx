import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";

export function UpdateButton({ id }: { id: string }) {
  return (
    <Link href={`/admin/positions/${id}/edit`}>
      Update
      <PencilIcon className="w-5" />
    </Link>
  );
}
