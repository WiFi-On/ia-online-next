"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

const useRedirect = () => {
  const router = useRouter();

  return useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );
};

export default useRedirect;
