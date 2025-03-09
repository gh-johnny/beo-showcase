import { ReactNode } from 'react'

interface ShowProps {
  render: ReactNode
  when: boolean
  fallback?: ReactNode
}

function Show({ render, when, fallback = null }: ShowProps) {
  return when ? <>{render}</> : <>{fallback}</>
}

export { Show }
