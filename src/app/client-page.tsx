"use client"

// import { useOccurrencesStore } from "@/context/OccurrencesContext"
import { useState } from "react"

interface ClientPageProps {
  callbackFnAction: (data: boolean) => Promise<boolean>
}

export default function ClientPage({ callbackFnAction }: ClientPageProps) {

  // const { setOccurrences } = useOccurrencesStore()

  const [flag, setFlag] = useState(false)

  const handleClientClick = async () => {
    const dataFromServer = await callbackFnAction(flag)
    console.log({ dataFromServer })
    // setOccurrences(dataFromServer)
    setFlag(dataFromServer)
  }

  return <button type="button" className="border p-1 m-12" onClick={() => handleClientClick()}>button client <span>{String(flag)}</span></button>
}
