import Image from "next/image";
import { Position } from "@/utils/definitions/position";
import Action from "@/ui/dashboard/action/Action";
import {
  PencilIcon,
  // PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import styles from "./PositionListItem.module.css";

export default function PositionListItem({ position }: { position: Position }) {
  return (
    <li className={styles.wrapper}>
      <div>{position.name}</div>
      {position.image && (
        <div>
          <Image
            className={styles.image}
            key={position.image}
            src={position.image}
            alt={position.alt || ""}
            // className="object-cover w-full"
            width={position.width || 100}
            height={position.height || 50}
          />
        </div>
      )}
      <div className={styles.actions}>
        <Action
          as="link"
          className="outline"
          icon={<PencilIcon />}
          href={`/admin/positions/${position.id}/edit`}
        >
          Update
        </Action>
        <Action as="button" className="danger" icon={<TrashIcon />}>
          Delete
        </Action>
      </div>
    </li>
  );
}
