"use client"

import { useState, useEffect } from "react"
import { MoreHorizontal, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { type Invoice, getInvoices, deleteInvoice, initializeDatabase } from "@/lib/supabase-ops"

export function InvoiceTable() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    async function initAndFetch() {
      setIsLoading(true)
      setError(null)
      const initialized = await initializeDatabase()
      if (initialized) {
        await fetchInvoices()
      } else {
        setError("Failed to initialize the database. Please try again later.")
      }
      setIsLoading(false)
    }
    initAndFetch()
  }, [])

  async function fetchInvoices() {
    const fetchedInvoices = await getInvoices()
    setInvoices(fetchedInvoices)
  }

  const filteredInvoices = invoices.filter(
    (invoice) =>
      (selectedStatus === "all" || invoice.status.toLowerCase() === selectedStatus) &&
      (invoice.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const pageCount = Math.ceil(filteredInvoices.length / itemsPerPage)
  const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const statusFilters = [
    { label: "All Invoice", value: "all", count: invoices.length },
    { label: "Paid", value: "paid", count: invoices.filter((inv) => inv.status === "Paid").length },
    { label: "Pending", value: "pending", count: invoices.filter((inv) => inv.status === "Pending").length },
    { label: "Unpaid", value: "unpaid", count: invoices.filter((inv) => inv.status === "Unpaid").length },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      case "unpaid":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDeleteInvoice = async (id: string) => {
    const success = await deleteInvoice(id)
    if (success) {
      fetchInvoices()
    }
  }

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>
  }

  if (invoices.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No invoices found. Create your first invoice to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 border-b">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedStatus(filter.value)}
            className={`pb-2 px-2 text-sm font-medium transition-colors hover:text-primary ${
              selectedStatus === filter.value ? "border-b-2 border-green-500 text-primary" : "text-muted-foreground"
            }`}
          >
            {filter.label}
            <span className="ml-2 text-xs text-muted-foreground">({filter.count})</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Select value={itemsPerPage.toString()} onValueChange={(value) => setCurrentPage(1)}>
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">Entries</span>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by email or client..."
            className="pl-8 w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Name Client</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Invoice Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>{invoice.email}</TableCell>
                <TableCell>{new Date(invoice.start_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(invoice.due_date).toLocaleDateString()}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(invoice.status)} variant="secondary">
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Invoice</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteInvoice(invoice.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredInvoices.length)} of {filteredInvoices.length} entries
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            {"<<"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            {"<"}
          </Button>
          {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
            const page = currentPage <= 3 ? i + 1 : currentPage + i - 2
            if (page <= pageCount) {
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              )
            }
            return null
          })}
          {pageCount > 5 && currentPage < pageCount - 2 && (
            <>
              <Button variant="outline" disabled>
                ...
              </Button>
              <Button variant="outline" onClick={() => setCurrentPage(pageCount)}>
                {pageCount}
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
          >
            {">"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(pageCount)}
            disabled={currentPage === pageCount}
          >
            {">>"}
          </Button>
        </div>
      </div>
    </div>
  )
}

