"use client";

import { useAppLoader } from "../hooks/useAppLoader";
import AppLoader from "./AppLoader";

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const { isLoading, completeLoading } = useAppLoader();

  return (
    <>
      {isLoading && <AppLoader onLoadComplete={completeLoading} />}
      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        {children}
      </div>
    </>
  );
}
