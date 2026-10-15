"user client";

import React from "react";
import QueryProvider from "./queryProvider";
import GoogleAuthProvider from "./googleAuthProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleAuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </GoogleAuthProvider>
  );
}
