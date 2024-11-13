import prisma from "@/utils/prisma";
// import PositionListItem from "@/ui/dashboard/positions/PositionListItem";
import Image from "next/image";
import Action from "@/ui/dashboard/action/Action";
import DeletePosition from "@/ui/dashboard/positions/DeletePosition";
import Paper from "@/ui/dashboard/surfaces/Paper";
import { PencilIcon } from "@heroicons/react/24/outline";
import styles from "./PositionList.module.css";
import { formatDate } from "@/utils/functions";

export default async function PositionList() {
  const positions = await prisma.position.findMany();

  if (positions.length === 0) {
    return (
      <Paper css={{ textAlign: "center" }}>No positions to display.</Paper>
    );
  }

  return (
    <Paper css={{ padding: "0 .5rem 1rem" }}>
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
            <th className={styles.th}>Alt</th>
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
              <td className={styles.td}>{position.alt}</td>

              <td className={styles.td}>{formatDate(position.createdAt)}</td>
              <td className={styles.td}>{formatDate(position.updatedAt)}</td>
              {/* for now 0 */}
              <td className={`${styles.td} ${styles.centered}`}>0</td>
              <td className={styles.td}>
                <div className={styles.actions}>
                  {/* TODO - tooltipy moglyby sie nad nimi pojawiac na hover */}
                  <Action
                    as="link"
                    className="outline"
                    icon={<PencilIcon />}
                    href={`/admin/positions/${position.id}/edit`}
                    hiddenLabel="Update"
                  />
                  <DeletePosition id={position.id} imageSrc={position.image} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
}
