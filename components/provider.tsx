"use client";

import React from "react";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  // const { isOnline } = useOnlineStatus();

  // useEffect(() => {
  //   if (isOnline) {
  //     toast.success("You're back online");
  //   } else {
  //     toast.error("You're currently offline", {
  //       description: "Please reconnect to internet.",
  //       duration: Number.POSITIVE_INFINITY,
  //     });
  //   }
  // }, [isOnline]);

  return <>{children}</>;
};
