import { House, LucideProps } from "lucide-react";
import Image from "next/image";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export function Header(
  { title, imgUrl, Icon = House }: { title: string, imgUrl: string | undefined, Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> }) {
  return (
    <header className="border-red-500 w-full h-20 flex gap-2 justify-center">
      <picture className="w-8 min-w-8 h-8 min-h-8 flex items-center">
        {
          imgUrl !== undefined ?
            <Image
              src={imgUrl}
              alt=""
              width={100}
              height={100}
            />
            : <Icon />
        }
      </picture>
      <h1 className="text-2xl text-semibold text-center">
        {title}
      </h1>
    </header>
  )
}

