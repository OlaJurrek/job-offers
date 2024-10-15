import React from "react";
import styles from "./surfaces.module.css";

type PaperProps = {
  children: React.ReactNode;
  as?: React.ElementType;
};

export default function Paper({ as, children }: PaperProps) {
  const Tag = as || "div";
  return <Tag className={styles.paper}>{children}</Tag>;
}
