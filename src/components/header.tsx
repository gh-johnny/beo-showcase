import Image from "next/image";

export function Header() {
  return (
    <header className="border-red-500 w-full h-20 flex gap-2 justify-center">
      <picture className="w-8 min-w-8 h-8 min-h-8">
        <Image
          src={'/brasao_sbo.png'}
          alt=""
          width={100}
          height={100}
        />
      </picture>
      <h1 className="text-2xl text-semibold text-center">
        Prefeitura de Santa Bárbara d{"'"}Oeste
      </h1>
    </header>
  )
}
