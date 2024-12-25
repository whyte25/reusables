"use client";

import { cn } from "@reusables/lib";
import { Trash2 } from "lucide-react";
import { Button } from "./button";
import { Modal } from "./modal";
import { SubmitButton } from "./submit-button";

interface IConfirmModal {
  image?: string;
  title: string;
  description: string;
  buttonText?: string;
  cancelButtonText?: string;
  cancelButtonClassName?: string;
  buttonContainerClassname?: string;
  showModalImage?: boolean;
  hideCloseIcon?: boolean;
  isConfirmModalOpen: boolean;
  isSubmitting?: boolean;
  handleCloseConfirmModal: () => void;
  handleModalAction: () => void;
  icon?: any;
}

export function ConfirmModal({
  image,
  icon,
  title,
  description,
  buttonText,
  isConfirmModalOpen,
  handleCloseConfirmModal,
  showModalImage = true,
  hideCloseIcon = true,
  isSubmitting = false,
  cancelButtonText,
  cancelButtonClassName,
  buttonContainerClassname,
  handleModalAction,
}: IConfirmModal) {
  return (
    <>
      <Modal
        hideIcon={hideCloseIcon}
        handleCloseModal={handleCloseConfirmModal}
        isModalOpen={isConfirmModalOpen}
        className={cn(
          "max-w-[90%] pb-10 shadow-transparent md:max-w-[380px]",
          !hideCloseIcon ? "pt-0" : "pt-16"
        )}
        overlayClassName="bg-black/50"
      >
        <div className="flex flex-col items-center justify-center gap-1">
          {showModalImage ? (
            <img
              src={image as string}
              className={` ${showModalImage ? "block rounded-full" : "hidden"}`}
              height={50}
              width={50}
              alt=""
            />
          ) : icon ? (
            icon
          ) : (
            <Trash2 size={30} className="text-red-500" />
          )}
          <p className="text-lg font-semibold">{title}</p>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="text-center text-sm text-gray-400"
          />

          <div
            className={cn(
              "mt-4 flex items-center justify-between gap-5",
              buttonContainerClassname
            )}
          >
            <Button
              onClick={handleCloseConfirmModal}
              className={cn(
                "border-red-500 px-10 text-red-500 hover:bg-red-500 hover:text-white",
                cancelButtonClassName
              )}
              variant={"outline"}
            >
              {cancelButtonText || "Cancel"}
            </Button>
            <SubmitButton
              isSubmitting={isSubmitting}
              disabled={isSubmitting}
              onClick={handleModalAction}
              variant={"default"}
            >
              {buttonText || "Yes, Proceed"}
            </SubmitButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
