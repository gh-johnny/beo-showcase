"use client"

interface ClientPageProps {
  callbackFnAction: (data: unknown) => void
}

export default function ClientPage({ callbackFnAction }: ClientPageProps) {

  const handleClientClick = () => {
    callbackFnAction({ opa: 'sim' })
  }

  return <button type="button" className="border p-1 m-12" onClick={() => handleClientClick()}>button client</button>
}
