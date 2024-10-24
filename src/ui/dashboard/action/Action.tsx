import React from "react";
import Link, { LinkProps } from "next/link";
import styles from "./Action.module.css";

type BaseProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  hiddenLabel?: string;
};

type ActionProps = BaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
        as: "button";
      })
    | (LinkProps & {
        as: "link";
      })
  );

export default function Action({
  className,
  icon,
  hiddenLabel,
  children,
  ...props
}: ActionProps) {
  const allClassNames = `${styles.button} ${
    className ? styles[className] : ""
  } ${icon ? "" : styles.textOnly}`;

  if (props.as === "link") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as, ...rest } = props;
    return (
      <Link className={allClassNames} {...rest}>
        <ActionContent icon={icon} hiddenLabel={hiddenLabel}>
          {children}
        </ActionContent>
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as, ...rest } = props;
  return (
    <button
      className={`${allClassNames} ${rest.disabled ? "disabled" : ""}`}
      {...rest}
    >
      <ActionContent icon={icon} hiddenLabel={hiddenLabel}>
        {children}
      </ActionContent>
    </button>
  );
}

function ActionContent({ icon, hiddenLabel, children }: BaseProps) {
  return (
    <>
      {icon}
      {hiddenLabel && <span className="visually-hidden">{hiddenLabel}</span>}
      {children && (
        <span className={`${icon ? styles.labelWithBorder : ""}`}>
          {children}
        </span>
      )}
    </>
  );
}
