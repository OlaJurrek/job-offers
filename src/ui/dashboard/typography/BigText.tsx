import styles from "@/ui/dashboard/typography/typography.module.css";
import { kanit } from "@/ui/fonts";

type headlines = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadlineType = {
  level?: headlines;
  variant: headlines;
  children: React.ReactNode;
};
export default function BigText({ level, children }: HeadlineType) {
  const Tag = level ? level : "h1";

  return (
    <Tag className={`${kanit.className} ${styles.basic} ${styles.variant}`}>
      {children}
    </Tag>
  );
}
