"use client";
import React from "react";
import {
  XMarkIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import { ToastContext } from "../ToastProvider";
import { ToastVariant, ToastContextType } from "../toast-types";

import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
};

const AUTO_HIDE_DURATION = 10000;

type ToastProps = {
  id: string;
  variant: ToastVariant;
  children: string;
};

export default function Toast({ id, variant, children }: ToastProps) {
  const { dismissToast } = React.useContext(ToastContext) as ToastContextType;
  const Icon = ICONS_BY_VARIANT[variant];

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!dismissToast) return;
      dismissToast(id);
    }, AUTO_HIDE_DURATION);
    return () => clearTimeout(timeoutId);
  }, [id, dismissToast]);

  if (!dismissToast) {
    throw new Error("Toast must be in ToastProvider!");
  }

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon width={24} />
      </div>
      <p className={styles.content}>
        <span className="visually-hidden">{variant} -</span>
        {children}
      </p>
      <button
        className={styles.closeButton}
        onClick={() => dismissToast(id)}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <XMarkIcon width={24} />
      </button>
    </div>
  );
}
