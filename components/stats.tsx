import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string
  change: {
    value: string
    positive: boolean
  }
}

function StatsCard({ title, value, change }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className={`text-xs ${change.positive ? "text-green-500" : "text-red-500"}`}>
          {change.positive ? "↑" : "↓"} {change.value}
        </span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">From last week</p>
      </CardContent>
    </Card>
  )
}

export function Stats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard title="Total Revenue" value="$734,241" change={{ value: "3.1%", positive: true }} />
      <StatsCard title="Total Customer" value="734,241" change={{ value: "5.1%", positive: true }} />
      <StatsCard title="Total Transaction" value="734" change={{ value: "5.1%", positive: false }} />
      <StatsCard title="Total Product" value="841" change={{ value: "5.1%", positive: true }} />
    </div>
  )
}

