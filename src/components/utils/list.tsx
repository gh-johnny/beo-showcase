import { ReactNode } from 'react'

interface ListProps<T> {
  items: T[]
  render: (item: T, index: number) => ReactNode
}

function List<T>({ items, render }: ListProps<T>) {
  return <>{items && items.map((item, index) => render(item, index))}</>
}

export { List }
