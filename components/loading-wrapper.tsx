import React, { ReactNode } from 'react';

interface LoadingWrapperProps {
  isLoading: boolean;
  children: ReactNode;
}

export function LoadingWrapper({ isLoading, children }: LoadingWrapperProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return <>{children}</>;
}