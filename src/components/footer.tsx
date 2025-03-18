"use client"

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname()

  if (pathName === "/login") {
    return null
  }

  return (
    <footer className="fixed bottom-0 w-dvw bg-[#f2f2f2] flex justify-center items-center h-16 border-gray-primary">
      <Image
        src="/logo_beo_transparent.png"
        alt=""
        width={100}
        height={100}
      />
      <div className="fixed bottom-16 w-full h-[40px] bg-gradient-to-b from-transparent via-transparent to-[#f2f2f2]" />
    </footer>
  )
}
