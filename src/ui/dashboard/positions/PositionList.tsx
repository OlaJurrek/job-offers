import prisma from "@/utils/prisma";
// import PositionListItem from "@/ui/dashboard/positions/PositionListItem";
import Image from "next/image";
import Action from "@/ui/dashboard/action/Action";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import styles from "./PositionList.module.css";
import { formatDate } from "@/utils/functions";

export default async function PositionList() {
  const positions = await prisma.position.findMany();

  return (
    <>
      {/* // mobile view */}
      {/* <ul>
        {positions.map((position) => (
          <PositionListItem key={position.id} position={position} />
        ))}
      </ul> */}
      {/* // desktop view */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Image</th>
            <th className={styles.th}>Created at</th>
            <th className={styles.th}>Updated at</th>
            <th className={styles.th}>Offers</th>
            <th className={styles.th}></th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.id} className={styles.tr}>
              <td className={styles.td}>{position.name}</td>
              <td className={styles.td}>
                {position.image ? (
                  <Image
                    className={styles.image}
                    key={position.image}
                    src={position.image}
                    alt={position.alt || ""}
                    width={position.width || 100}
                    height={position.height || 50}
                  />
                ) : (
                  <Image
                    className={styles.image}
                    src="/images/default-position.svg"
                    height={360}
                    width={400}
                    alt="Voltura Logo"
                  />
                )}
              </td>
              <td className={styles.td}>{formatDate(position.createdAt)}</td>
              <td className={styles.td}>{formatDate(position.updatedAt)}</td>
              {/* for now 0 */}
              <td className={`${styles.td} ${styles.centered}`}>0</td>
              <td className={styles.td}>
                <div className={styles.actions}>
                  <Action
                    as="link"
                    className="outline"
                    icon={<PencilIcon />}
                    href={`/admin/positions/${position.id}/edit`}
                    hiddenLabel="Update"
                  />

                  <Action
                    as="button"
                    className="danger"
                    icon={<TrashIcon />}
                    hiddenLabel="Delete"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
