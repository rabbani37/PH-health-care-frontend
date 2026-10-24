import { ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function AccessDenied() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive animate-bounce">
        <ShieldAlert className="h-10 w-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          You don't have access to this page
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Go Back to{' '}
          <Link 
            href={'/'} 
            className="font-medium  underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            Home
          </Link>
        </p>
      </div>
    </div>
  )
}
