"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createInvoice } from "@/lib/supabase-ops"

interface AddInvoiceFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInvoiceAdded: () => void
}

export function AddInvoiceForm({ open, onOpenChange, onInvoiceAdded }: AddInvoiceFormProps) {
  const [formData, setFormData] = useState({
    client: "",
    email: "",
    start_date: "",
    due_date: "",
    amount: "",
    status: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newInvoice = await createInvoice({
      ...formData,
      amount: Number.parseFloat(formData.amount),
    })
    if (newInvoice) {
      onInvoiceAdded()
      onOpenChange(false)
      setFormData({
        client: "",
        email: "",
        start_date: "",
        due_date: "",
        amount: "",
        status: "",
      })
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[540px]">
        <SheetHeader className="flex items-center justify-between">
          <SheetTitle>Add New Invoice</SheetTitle>
          <Button size="icon" variant="ghost" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="client">Client Name</Label>
            <Input
              id="client"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              placeholder="Enter client name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="client@example.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="due_date">Due Date</Label>
              <Input id="due_date" name="due_date" type="date" value={formData.due_date} onChange={handleInputChange} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Invoice Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="0.00"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={handleSelectChange} value={formData.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Invoice</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}

