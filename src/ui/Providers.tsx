import ToastProvider from "@/ui/toast/ToastProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
