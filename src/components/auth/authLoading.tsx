import {  LoaderIcon } from "lucide-react";
import React from "react";

export default function AuthLoading({
  lable = "Verifying account",
}: {
  lable?: string;
}) {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex gap-3">
        <LoaderIcon className="animate-spin size-6" />
        {lable}
      </div>
    </div>
  );
}
