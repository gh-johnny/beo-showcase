import { NAV_PATHS } from "@/types/nav-types";
import { Home, LucideProps, Settings, UserRound } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

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
    text: 'Transporte Público',
    active: true,
    icon: '/transporte.png'
  },
]

export const SIDEBAR_CONFIG: sidebarConfig[] = [
  {
    text: 'Configurações',
    active: true,
    icon: Settings,
  },
  {
    text: 'Usuário',
    active: true,
    icon: UserRound,
  }
]
