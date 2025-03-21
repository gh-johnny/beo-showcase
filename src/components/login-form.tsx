"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import React from "react"
import { Show } from "./utils/show"
import { useRouter } from "next/navigation"
import { useRef } from "react";
import { useMount } from "@/hooks/use-mount"

const ADMIN_EMAIL = 'admin@beo.com'
const ADMIN_PASS = '123123'

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement | null>(null)
  const passInputRef = useRef<HTMLInputElement | null>(null)

  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  }

  const sendForm = () => {
    if (emailInputRef.current === null ||
      passInputRef.current === null) {
      return;
    }

    if (emailInputRef.current.value !== ADMIN_EMAIL || passInputRef.current.value !== ADMIN_PASS) {
      return;
    }

    emailInputRef.current.value = "";
    passInputRef.current.value = "";

    router.push('/')
  }

  useMount(() => {
    router.prefetch('/')
    router.prefetch('/defesa-civil')
  })

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Digite seu e-mail e senha para entrar na plataforma
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            ref={emailInputRef}
            id="email"
            type="email"
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="relative grid gap-2">
          <Input
            ref={passInputRef}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="*******"
            required
          />
          <Button
            className="bg-transparent shadow-none hover:bg-transparent group min-w-8 w-8 min-h-8 h-8 absolute right-2 top-1/2 -translate-y-1/2"
            type="button"
            onClick={() => toggleShowPassword()}
          >
            <>
              <Show
                when={showPassword}
                render={
                  <Eye className="text-zinc-600" />
                }
                fallback={
                  <EyeOff className="text-zinc-600" />
                }
              />
            </>
          </Button>
        </div>
        <Button
          type="button"
          className="bg-blue-light w-full hover:bg-blue-light/70"
          onClick={() => sendForm()}
        >
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        <a href="#" className="text-blue-link underline underline-offset-4">
          Esqueci minha senha{" "}
        </a>
      </div>
    </form>
  )
}
