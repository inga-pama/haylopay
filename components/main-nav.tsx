import {
  Home,
  BarChart,
  Package,
  ShoppingCart,
  CreditCard,
  RefreshCw,
  FileText,
  ArrowLeftRight,
  Bell,
  MessageSquare,
  Settings,
  Sun,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

const mainNav = [
  {
    title: "Overview",
    icon: Home,
    href: "/",
  },
  {
    title: "Analytics",
    icon: BarChart,
    href: "/analytics",
  },
  {
    title: "Product",
    icon: Package,
    href: "/products",
  },
  {
    title: "Sales",
    icon: ShoppingCart,
    href: "/sales",
  },
  {
    title: "Transaction",
    icon: ArrowLeftRight,
    subitems: [
      {
        title: "Payment",
        href: "/transactions/payment",
        icon: CreditCard,
      },
      {
        title: "Refunds",
        href: "/transactions/refunds",
        icon: RefreshCw,
      },
      {
        title: "Invoices",
        href: "/transactions/invoices",
        icon: FileText,
      },
      {
        title: "Returns",
        href: "/transactions/returns",
        icon: RefreshCw,
      },
    ],
  },
]

const generalNav = [
  {
    title: "Notifications",
    icon: Bell,
    href: "/notifications",
  },
  {
    title: "Feedback",
    icon: MessageSquare,
    href: "/feedback",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function MainNav() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="size-8 rounded bg-primary p-1">
            <Sun className="size-full text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">SalesSync</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Main Menu</h2>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.subitems && (
                    <SidebarMenuSub>
                      {item.subitems.map((subitem) => (
                        <SidebarMenuSubItem key={subitem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subitem.href}>
                              <subitem.icon className="size-4" />
                              <span>{subitem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">General</h2>
            <SidebarMenu>
              {generalNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

