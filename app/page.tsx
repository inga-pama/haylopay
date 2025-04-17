import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { TopTransactions } from "@/components/top-transactions"
import { CustomerGrowth } from "@/components/customer-growth"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <span className="text-xs text-green-500">↑ 3.1%</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$734,241</div>
            <p className="text-xs text-muted-foreground">From last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customer</CardTitle>
            <span className="text-xs text-green-500">↑ 5.1%</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">734,241</div>
            <p className="text-xs text-muted-foreground">From last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transaction</CardTitle>
            <span className="text-xs text-red-500">↓ 5.1%</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">734</div>
            <p className="text-xs text-muted-foreground">From last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Product</CardTitle>
            <span className="text-xs text-green-500">↑ 5.1%</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">841</div>
            <p className="text-xs text-muted-foreground">From last week</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Allocation Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Last Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Top Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <TopTransactions />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerGrowth />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

