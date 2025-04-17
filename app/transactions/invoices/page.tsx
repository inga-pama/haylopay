"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/header"
import { Stats } from "@/components/stats"
import { InvoiceTable } from "@/components/invoice-table"
import { AddInvoiceForm } from "@/components/add-invoice-form"
import { Button } from "@/components/ui/button"

export default function InvoicesPage() {
  const [isAddInvoiceOpen, setIsAddInvoiceOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleInvoiceAdded = useCallback(() => {
    setRefreshKey((prev) => prev + 1)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Overview" />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Invoice</h2>
          <Button onClick={() => setIsAddInvoiceOpen(true)} className="bg-green-500 hover:bg-green-600">
            Add Invoice
          </Button>
        </div>
        <Stats />
        <InvoiceTable key={refreshKey} />
        <AddInvoiceForm
          open={isAddInvoiceOpen}
          onOpenChange={setIsAddInvoiceOpen}
          onInvoiceAdded={handleInvoiceAdded}
        />
      </main>
    </div>
  )
}

