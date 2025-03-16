"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import Image from "next/image"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useMount } from "@/hooks/use-mount"
import { usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import Link from "next/link"
import { Show } from "./utils/show"
import { List } from "./utils/list"
import { SIDEBAR_CONFIG, SIDEBAR_ROUTE_CONTENT } from "@/config/sidebar-content"
import { ChevronRight, Menu } from "lucide-react"

export const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = ({ ...props }) => {
  const { isMobile, setOpen } = useSidebar();

  useMount(() => {
    setOpen(false)
  })

  return (
    <Sidebar
      collapsible={isMobile ? "offcanvas" : "icon"} {...props}
    >
      <div className="py-4 relative w-full flex flex-col justify-center items-center h-full">
        <AppSidebarTrigger />

        <Show
          when={isMobile}
          render={
            <>
              <DialogTitle className="absolute -z-50 bg-transparent text-transparent">
                <span className="sr-only">Sidebar</span>
              </DialogTitle>
              <DialogDescription className="absolute -z-50 bg-transparent text-transparent">
                <span className="sr-only">Sidebar</span>
              </DialogDescription>
            </>
          }
        />

        <SidebarHeader
          data-ismobile={isMobile}
          className="group-data-[state=collapsed]:mx-auto group-data-[state=expanded]:px-2 data-[ismobile=true]:mx-auto"
        >
          <NavSideBar />
          {
            // <LogoSideBar />
          }
        </SidebarHeader>

        <SidebarContent>
        </SidebarContent>

        <SidebarFooter>
          <SidebarRail />
          <SidebarConfig />
        </SidebarFooter>
      </div>
    </Sidebar>
  )
}

const NavSideBar: React.FC = () => {
  const path = usePathname()
  return (
    <section>
      <TooltipProvider>
        <ToggleGroup value={path} type="single" className="flex flex-col gap-3">
          <List
            items={SIDEBAR_ROUTE_CONTENT}
            render={(route, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <Link
                    href={!route.active ? path : route.path}
                    className="flex items-center gap-4 rounded w-full"
                  >
                    <ToggleGroupItem
                      value={route.path}
                      data-active-route={path === route.path}
                      data-disabled-link={!route.active}
                      className="min-w-8 w-8 min-h-8 h-8 p-0 data-[disabled-link=true]:opacity-30"
                    >
                      <div
                        data-active-route={path === route.path}
                        data-disabled-link={!route.active}
                        className="hover:border-gray-primary border border-transparent rounded w-full h-full flex justify-center items-center data-[active-route=true]:border-blue-primary"
                      >
                        <Show
                          when={typeof route.icon === 'string'}
                          render={
                            <Image
                              src={route.icon as string}
                              alt=""
                              width={50}
                              height={50}
                              className="p-[6px]"
                            />
                          }
                          fallback={
                            <route.icon className="text-blue-primary" strokeWidth={2} />
                          }
                        />
                      </div>
                    </ToggleGroupItem>
                    <p
                      data-disabled={!route.active}
                      className="transition-all whitespace-nowrap text-sm text-accent-foreground group-data-[state=collapsed]:hidden data-[disabled=true]:text-zinc-500"
                    >
                      {route.text}
                    </p>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {route.text}
                </TooltipContent>
              </Tooltip>
            )}
          />
        </ToggleGroup>
      </TooltipProvider>
    </section>
  )
}

const SidebarConfig: React.FC = () => {
  return (
    <section className="flex gap-3 flex-col">
      <TooltipProvider>
        <List
          items={SIDEBAR_CONFIG}
          render={(item, i) => (
            <Tooltip key={i}>
              <TooltipTrigger>
                <div
                  className="w-full h-full flex items-center gap-6 rounded data-[active-route=true]:bg-blue-primary data-[active-route=true]:text-white"
                >
                  <picture className="border border-transparent rounded hover:border-zinc-500 flex justify-center items-center min-w-8 w-8 min-h-8 h-8 p-[6px]">
                    <Show
                      when={typeof item.icon === 'string'}
                      render={
                        <Image
                          src={item.icon as string}
                          alt=""
                          width={50}
                          height={50}
                        />
                      }
                      fallback={
                        <item.icon className="text-white" strokeWidth={2} />
                      }
                    />
                  </picture>
                  <p
                    data-disabled={!item.active}
                    className="transition-all whitespace-nowrap text-sm text-accent-foreground group-data-[state=collapsed]:hidden data-[disabled=true]:text-zinc-500"
                  >
                    {item.text}
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                {item.text}
              </TooltipContent>
            </Tooltip>
          )}
        />
      </TooltipProvider>
    </section>
  )
}

const LogoSideBar: React.FC = () => {
  return (
    <>
      <section className="flex justify-center items-center h-full">
        <Image
          src="/logo_beo_transparent.png"
          alt=""
          width={80}
          height={80}
          priority
        />
      </section>
    </>
  )
}

export const AppSidebarTrigger: React.FC = () => {
  const { isMobile, open } = useSidebar();

  return (
    <SidebarTrigger
      data-expanded={open}
      className="absolute top-1 -right-10 border transition-all duration-500 m-1 min-w-6 w-6 min-h-6 h-6 data-[expanded=true]:rotate-180"
      icon={isMobile ? Menu : ChevronRight}
    />
  )
}
