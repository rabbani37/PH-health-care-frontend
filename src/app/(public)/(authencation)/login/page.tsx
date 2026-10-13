import { LoginForm } from "@/components/form/login-form";
import { GalleryVerticalEnd } from "lucide-react";

import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            PH Healthcare
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
        loading="lazy"
          width={500}
          height={500}
          src="/login.jpg"
          alt="Image"
          className="absolute inset-0 w-9/12 h-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
