import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const transactions = [
  {
    id: "#345345",
    category: "Table",
    date: "11/11",
    price: "$40.44",
    status: "Complete",
  },
  {
    id: "#345345",
    category: "Table",
    date: "11/11",
    price: "$40.44",
    status: "On Delivery",
  },
  {
    id: "#345345",
    category: "Table",
    date: "11/11",
    price: "$40.44",
    status: "Complete",
  },
  {
    id: "#345345",
    category: "Table",
    date: "11/11",
    price: "$40.44",
    status: "Cancelled",
  },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "complete":
      return "bg-green-100 text-green-800"
    case "on delivery":
      return "bg-blue-100 text-blue-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function TopTransactions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer ID</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, i) => (
          <TableRow key={i}>
            <TableCell>{transaction.id}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.price}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(transaction.status)} variant="secondary">
                {transaction.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

