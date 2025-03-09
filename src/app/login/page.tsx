"use client"
import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full mb-12 flex flex-col gap-4 max-w-xs">
            <picture className="mx-auto w-32 h-32 flex justify-center items-center">
              <Image
                src={'/logo_beo_transparent.png'}
                alt=""
                width={1000}
                height={1000}
                className=""
              />
            </picture>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:flex justify-center items-center bg-blue-primary">
        <picture className="w-1/2 flex flex-col gap-4">
          <Image
            src="/beodog.png"
            width={2080}
            height={2080}
            alt=""
          />
          <h1 className="mx-auto text-2xl text-white">Qual é o seu Beó?</h1>
        </picture>
      </div>
    </div>
  )
}
