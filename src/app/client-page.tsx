"use client"

import { useOccurrencesStore } from "@/context/OccurrencesContext"
import { useState } from "react"

interface ClientPageProps {
  callbackFnAction: (data: boolean) => Promise<boolean>
}

export default function ClientPage({ callbackFnAction }: ClientPageProps) {

  const { occurrences } = useOccurrencesStore()

  const [flag, setFlag] = useState(false)

  const handleClientClick = async() => {
    const fromServer = await callbackFnAction(flag)
    console.log({fromServer})
    setFlag(fromServer)
  }

  return <button type="button" className="border p-1 m-12" onClick={() => handleClientClick()}>button client <span>{String(flag)}</span></button>
}
