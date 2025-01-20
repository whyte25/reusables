// todo: remove ts-nocheck and fix types
// @ts-nocheck
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";
import { Toast } from "./toast";

const toastPositionVariants = cva("absolute max-w-[420px] w-full p-4", {
  variants: {
    position: {
      "top-left": "top-0 left-0",
      "top-center": "top-0 left-1/2 transform -translate-x-1/2",
      "top-right": "top-0 right-0",
      "bottom-left": "bottom-0 left-0",
      "bottom-center": "bottom-0 left-1/2 transform -translate-x-1/2",
      "bottom-right": "bottom-0 right-0",
    },
  },
  defaultVariants: {
    position: "bottom-right",
  },
});

let toastId = 0;
const generateId = () => String(toastId++);

interface ToastState {
  dismiss: () => void;
  id: string;
  params: ToastParams;
}

export interface ToastParams {
  closable?: boolean;
  className?: string;
  description?: React.ReactNode;
  duration?: number;
  id?: string;
  onClose?: () => void;
  title: string;
  status?: "error" | "warning" | "success" | "info" | "default" | "loading";
  loaderVariant?: "loader-1" | "loader-2" | "loader-3";
}

export interface ToastContextValue {
  version: 0.0;
  push: (params: ToastParams) => string;
  promise: (promise: () => Promise<any>, options: any) => string;
}

const ToastContext = createContext<ToastContextValue>({
  version: 0.0,
  push: () => "",
  promise: () => "",
});

export function ToastProvider({
  children,
  position = "top-right",
}: {
  children: React.ReactNode;
  position?: VariantProps<typeof toastPositionVariants>["position"];
}) {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const toastsRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const value: ToastContextValue = useMemo(() => {
    const push = (params: ToastParams) => {
      const id = params.id || generateId();
      const duration = params.duration || 5000;

      const dismiss = () => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        if (toastsRef.current[id]) {
          clearTimeout(toastsRef.current[id]);
          delete toastsRef.current[id];
        }
      };

      setToasts((prev) => [
        ...prev.filter((t) => t.id !== id),
        { dismiss, id, params: { ...params, duration } },
      ]);

      if (toastsRef.current[id]) {
        clearTimeout(toastsRef.current[id]);
      }

      toastsRef.current[id] = setTimeout(dismiss, duration);

      return id;
    };
    const pushPromise = (promise: () => Promise<any>, options: any) => {
      const id = generateId();
      push({
        status: "loading",
        title: options.loading || "Loading...",
        description: options.loading || "Please wait.",
        id,
      });

      promise()
        .then((data) => {
          setToasts((prev) => [
            ...prev.filter((t) => t.id !== id),
            {
              id,
              params: {
                status: "success",
                title: options.success(data) || "Success!",
                duration: 3000,
                closable: true,
              },
            },
          ]);
        })
        .catch((error) => {
          setToasts((prev) => [
            ...prev.filter((t) => t.id !== id),
            {
              id,
              params: {
                status: "error",
                title: options.error || "Error",
                description: error?.message || "Something went wrong.",
              },
            },
          ]);
        });

      return id;
    };

    return { version: 0.0, push, promise: pushPromise };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(toastsRef.current).forEach(clearTimeout);
      toastsRef.current = {};
    };
  }, []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className={cn(
            toastPositionVariants({ position }),
            "pointer-events-auto"
          )}
        >
          <div className="p-4">
            <AnimatePresence initial={false}>
              {toasts.map(({ dismiss, id, params }) => {
                const isTop = position?.includes("top");

                return (
                  <motion.div
                    key={id}
                    layout
                    initial={{ opacity: 0, y: isTop ? -50 : 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      transition: { duration: 0.2 },
                    }}
                    className="mb-4 last:mb-0"
                  >
                    <Toast {...params} onClose={dismiss} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}

export default { ToastContext };
