import { NAV_PATHS } from "@/types/nav-types";
import { BusFront, DropletOff, Home, LucideProps, Settings, Trees, TriangleAlert, UserRound } from "lucide-react";
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
    path: '/saneamento-basico',
    text: 'Saneamento básico',
    active: true,
    icon: DropletOff
  },
  {
    path: '/defesa-civil',
    text: 'Defesa civil',
    active: true,
    icon: TriangleAlert
  },
  {
    path: '/vias-e-areas-publicas',
    text: 'Vias e áreas públicas',
    active: true,
    icon: Trees
  },
  {
    path: '/mobilidade-urbana',
    text: 'Mobilidade urbana',
    active: true,
    icon: BusFront
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
