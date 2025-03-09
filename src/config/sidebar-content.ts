import { NAV_PATHS } from "@/types/nav-types";
import { FileText, Home, LogIn, LogOut, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useRouter } from "next/router";

type routesContent = {
  path: NAV_PATHS,
  text: string,
  active: boolean,
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> | string
}

type sidebarConfig = {
  text: string,
  active: boolean,
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> | string
  action?: (...args: unknown[]) => unknown
  useAction?: (...args: unknown[]) => unknown
}

export const SIDEBAR_ROUTE_CONTENT: routesContent[] = [
  {
    path: '/',
    text: 'Home',
    active: true,
    icon: Home
  },
  {
    path: '/clima',
    text: 'Clima',
    active: true,
    icon: '/clima.png'
  },
  {
    path: '/saneamento-basico',
    text: 'Saneamento Básico',
    active: true,
    icon: '/saneamento.png'
  },
  {
    path: '/vias-e-areas-publicas',
    text: 'Vias e Áreas Públicas',
    active: true,
    icon: '/vias.png'
  },
  {
    path: '/transporte-urbano',
    text: 'Transporte Urbano',
    active: true,
    icon: '/transporte.png'
  },
]

export const SIDEBAR_CONFIG: sidebarConfig[] = [
  {
    text: 'Exportar PDF',
    active: true,
    icon: FileText,
    action: () => console.log('exportar para pdf')
  },
  {
    text: 'Log out',
    active: true,
    icon: LogOut,
    useAction: () => {
      const router = useRouter()
      router.push("/login")
    }
  }
]
