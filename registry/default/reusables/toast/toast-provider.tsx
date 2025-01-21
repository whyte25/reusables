"use client";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Toast } from "./toast";

export const TOAST_VERSION = "0.0" as const;

export const DEFAULT_CONFIG = {
  duration: 4000,
  position: "bottom-right",
  closable: true,
} as const;

const toastPositionVariants = cva("absolute max-w-[420px] w-full p-4 md:p-8 ", {
  variants: {
    position: {
      "top-left": "top-0 md:top-0 left-0",
      "top-center": "top-0 md:top-0 left-1/2 transform -translate-x-1/2",
      "top-right": "top-0 md:top-0 right-0",
      "bottom-left": "bottom-0 md:bottom-0 left-0",
      "bottom-center":
        "bottom-0 md:bottom-0 left-1/2 transform -translate-x-1/2",
      "bottom-right": "bottom-0 md:bottom-0 right-0",
    },
  },
  defaultVariants: {
    position: DEFAULT_CONFIG.position,
  },
});

type ToastPosition = VariantProps<typeof toastPositionVariants>["position"];

interface ToastState {
  dismiss: () => void;
  id: string;
  params: ToastParams;
  position?: ToastPosition;
}

export interface ToastParams {
  closable?: boolean;
  classNames?: ToastClassNames;
  description?: React.ReactNode;
  duration?: number;
  id?: string;
  onClose?: () => void;
  title: string;
  status?: "error" | "warning" | "success" | "info" | "default" | "loading";
  loaderVariant?: "loader-1" | "loader-2";
  position?: ToastPosition;
}

export interface ToastPromiseOptions<T> {
  loading: string;
  success: (data: T) => string;
  error?: string;
  position?: ToastPosition;
  duration?: number;
  classNames?: ToastClassNames;
}

export interface ToastContextValue {
  version: typeof TOAST_VERSION;
  push: (params: ToastParams) => string;
  promise: <T>(
    promise: () => Promise<T>,
    options: ToastPromiseOptions<T>
  ) => string;
}

export interface ToastClassNames {
  error?: string;
  success?: string;
  warning?: string;
  info?: string;
  loading?: string;
  closeButton?: string;
  title?: string;
  description?: string;
  loader?: string;
  progressBar?: string;
  containerClassName?: string;
}

// Context
const ToastContext = createContext<ToastContextValue>({
  version: TOAST_VERSION,
  push: () => "",
  promise: () => "",
});

// ID Generator
let toastId = 0;
const generateId = () => String(toastId++);

// Provider Component
export function ToastProvider({
  children,
  position: defaultPosition = DEFAULT_CONFIG.position,
  duration = DEFAULT_CONFIG.duration,
  classNames = {},
  closable = DEFAULT_CONFIG.closable,
}: {
  children: React.ReactNode;
  position?: ToastPosition;
  duration?: number;
  classNames?: ToastClassNames;
  closable?: boolean;
}) {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const toastsRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  // Optimized grouping of toasts by position
  const toastsByPosition = useMemo(() => {
    const positions = {} as Record<string, ToastState[]>;
    for (const toast of toasts) {
      const position = toast.params.position ?? defaultPosition;
      positions[position!] = positions[position!] || [];
      positions[position!].push(toast);
    }
    return positions;
  }, [toasts, defaultPosition]);

  const value: ToastContextValue = useMemo(() => {
    const createDismiss = (id: string) => () => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      if (toastsRef.current[id]) {
        clearTimeout(toastsRef.current[id]);
        delete toastsRef.current[id];
      }
    };

    const push = (params: ToastParams) => {
      const id = params.id ?? generateId();
      const toastDuration = params.duration ?? duration;

      const dismiss = createDismiss(id);

      setToasts((prev) => [
        {
          dismiss,
          id,
          params: {
            ...params,
            duration: toastDuration,
            closable: params.closable ?? closable,
            classNames,
            position: params.position ?? defaultPosition,
          },
        },
        ...prev.filter((t) => t.id !== id),
      ]);

      if (toastsRef.current[id]) {
        clearTimeout(toastsRef.current[id]);
      }

      if (toastDuration !== Infinity) {
        toastsRef.current[id] = setTimeout(dismiss, toastDuration);
      }

      return id;
    };

    const pushPromise = <T,>(
      promise: () => Promise<T>,
      options: ToastPromiseOptions<T>
    ) => {
      const id = generateId();
      const dismiss = createDismiss(id);
      const position = options.position;
      const toastDuration = options.duration ?? duration;
      const toastClassNames = options.classNames ?? classNames;

      push({
        status: "loading",
        title: options.loading,
        id,
        position,
        classNames: toastClassNames,
        duration: toastDuration,
      });

      promise()
        .then((data) => {
          setToasts((prev) => [
            {
              dismiss,
              id,
              params: {
                status: "success",
                title: options.success(data),
                duration: toastDuration,
                closable: true,
                classNames: toastClassNames,
                position,
              },
            },
            ...prev.filter((t) => t.id !== id),
          ]);
        })
        .catch((error) => {
          setToasts((prev) => [
            {
              dismiss,
              id,
              params: {
                status: "error",
                title: options.error ?? "Error",
                description: error?.message ?? "Something went wrong.",
                duration: toastDuration,
                classNames: toastClassNames,
                position,
              },
            },
            ...prev.filter((t) => t.id !== id),
          ]);
        });

      return id;
    };

    return { version: TOAST_VERSION, push, promise: pushPromise };
  }, [duration, classNames, closable, defaultPosition]);

  useEffect(() => {
    return () => {
      Object.values(toastsRef.current).forEach(clearTimeout);
      toastsRef.current = {};
    };
  }, []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="alert"
        aria-live="polite"
        className="fixed inset-0 pointer-events-none z-[999999]"
      >
        {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
          <div
            key={position}
            className={cn(
              toastPositionVariants({
                position: position as ToastPosition,
              }),
              classNames.containerClassName
            )}
          >
            <AnimatePresence>
              {positionToasts.map(({ dismiss, id, params }, index) => {
                const isTop = position?.includes("top");
                return (
                  <motion.div
                    key={id}
                    layout
                    initial={{ opacity: 0, y: isTop ? -80 : 80, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      y: isTop ? -80 : 80,
                      transition: { duration: 0.2 },
                    }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 300,
                    }}
                    className="mb-3.5 last:mb-0 pointer-events-auto"
                    style={{
                      zIndex: positionToasts.length - index,
                    }}
                  >
                    <Toast {...params} onClose={dismiss} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ))}
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
