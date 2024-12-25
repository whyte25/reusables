"use client";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface ModalLayoutProp {
  className?: string;
  overlayClassName?: string;
  children: ReactNode;
  hideIcon?: boolean;
  isModalOpen: boolean;
  onClick?: () => void;
  handleCloseModal: () => void;
}

{
  /*
    The `onClick` function prop is intended for scenarios where you want the modal overlay to close when clicked. To achieve this, simply pass the `handleCloseModal` function from the `useHandleModal` hook to this prop in any component utilizing it.

    Additionally, the `showIcon` boolean is available to control the visibility of an icon, and it is set to true by default.
  */
}

export const Modal = ({
  className,
  overlayClassName,
  children,
  hideIcon = false,
  isModalOpen,
  handleCloseModal,
  onClick,
}: ModalLayoutProp) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  return (
    <div
      onClick={onClick}
      className={twMerge(
        `fixed inset-0 z-[999999] w-screen cursor-pointer bg-black/50 animate-out ${
          isModalOpen
            ? "visible animate-in fade-in-0"
            : "invisible animate-out fade-out-0"
        }`,
        overlayClassName,
      )}
    >
      <div
        className={twMerge(
          `fixed left-[50%] top-[50%] z-[9999] grid w-full max-w-[95%] translate-x-[-50%] translate-y-[-50%] gap-4 overflow-hidden overflow-y-auto rounded-lg bg-white p-6 sm:max-w-sm ${
            isModalOpen
              ? "animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%]"
              : "animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-[48%]"
          }`,
          className,
        )}
      >
        <button
          onClick={handleCloseModal}
          className={`ml-auto w-fit self-start rounded border border-primary p-0.5 text-gray-400 hover:text-black ${
            hideIcon ? "hidden" : "block"
          }`}
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  );
};
