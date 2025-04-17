import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentSales = [
  { name: "Fallah Maulana", amount: "$36.00", initials: "FM" },
  { name: "Owen Achmad", amount: "$76.00", initials: "OA" },
  { name: "Kim do Jang", amount: "$46.00", initials: "KJ" },
  { name: "Son Shi", amount: "$56.00", initials: "SS" },
  { name: "Son Fan", amount: "$46.00", initials: "SF" },
]

export function RecentSales() {
  return (
    <div className="space-y-8">
      {recentSales.map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="size-9">
            <AvatarImage src={`https://i.pravatar.cc/36?img=${index + 1}`} alt={sale.name} />
            <AvatarFallback>{sale.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">Complete Order</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  )
}

