"use client";
import { TooltipProvider } from "@reusables/ui/tooltip";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "./react-query-provider";

//This provider setup is responsible for providing all the apps with the library and packages needed.
//react-query
//sonner
//tooltip

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <ReactQueryProvider>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>

      <Toaster
        position="top-right"
        duration={3000}
        closeButton
        toastOptions={{
          unstyled: true,
          classNames: {
            closeButton:
              "!bg-transparent  ml-auto mt-2 -mr-1.5 border-white  !text-white !right-0",
            error:
              "destructive group border-red-700 bg-red-700 text-white  group pointer-events-auto relative flex w-full  items-center  space-x-4 overflow-hidden rounded-md text-sm  px-0 py-4 pr-8  shadow-lg transition-all ",
            success:
              " group border-green-700 bg-green-700 text-white  group pointer-events-auto relative flex w-full  items-center  space-x-4 overflow-hidden rounded-md   px-0 py-4 pr-8 text-sm pr-8  shadow-lg transition-all ",
            warning:
              "text-white group border-yellow-600 bg-yellow-600 text-white  group pointer-events-auto relative flex w-full  items-center  space-x-4 overflow-hidden rounded-md   px-0 py-4 pr-8 text-sm pr-8  shadow-lg transition-all",
            info: "bg-primary group   text-white  group pointer-events-auto relative flex w-full  items-center  space-x-4 overflow-hidden rounded-md   px-0 py-4 pr-8 text-sm pr-8  shadow-lg transition-all",
          },
        }}
      />
    </ReactQueryProvider>
  );
};
