export type ToastVariant = "success" | "error";

export type ToastType = {
  id: string;
  message: string;
  variant: ToastVariant;
};

export type ToastContextType = {
  toasts: ToastType[];
  createToast?: (message: string, variant: ToastVariant) => void;
  dismissToast?: (id: string) => void;
};
