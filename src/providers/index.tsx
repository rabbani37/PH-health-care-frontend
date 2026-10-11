'user client'

import React from "react";
import QueryProvider from "./queryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
