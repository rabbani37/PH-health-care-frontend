import { GalleryVerticalEnd } from "lucide-react"


import Link from "next/link"
import Image from "next/image"
import { SignupForm } from "@/components/form/signup-form"
import Logo from "@/assets/svg/logo"

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex items-center justify-center rounded-md ">
              <Logo/>
            </div>
           PH Healthcare
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
        loading="eager"
        width={500}
        height={500}
          src="/register.jpg"
          alt="Image"
          className="absolute inset-0 w-11/12 h-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
