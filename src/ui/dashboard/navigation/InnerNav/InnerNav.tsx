import Action from "@/ui/dashboard/action/Action";
import { PlusIcon } from "@heroicons/react/24/outline";
import styles from "./InnerNav.module.css";

type InnerNavProps = {
  searchPlaceholder: string;
  linkName: string;
  href: string;
};
export default function InnerNav({
  searchPlaceholder,
  linkName,
  href,
}: InnerNavProps) {
  return (
    <div className={styles.wrapper}>
      <div>TODO - search component {searchPlaceholder}</div>
      <Action as="link" href={href} className="primary" icon={<PlusIcon />}>
        {linkName}
      </Action>
    </div>
  );
}
