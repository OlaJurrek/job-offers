import React from "react";
import styles from "./surfaces.module.css";

type PaperProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  css?: { [key: string]: string };
};

export default function Paper({ as, children, css }: PaperProps) {
  const Tag = as || "div";
  return (
    <Tag className={styles.paper} style={css}>
      {children}
    </Tag>
  );
}
