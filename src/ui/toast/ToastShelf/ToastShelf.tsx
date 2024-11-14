"use client";
import React from "react";

import { ToastContext } from "@/ui/toast/ToastProvider";
import Toast from "@/ui/toast/Toast/Toast";
import { ToastContextType } from "../toast-types";

import styles from "./ToastShelf.module.css";

export default function ToastShelf() {
  const { toasts } = React.useContext(ToastContext) as ToastContextType;

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="assertive"
      aria-label="Notification"
    >
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast id={toast.id} variant={toast.variant}>
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}
