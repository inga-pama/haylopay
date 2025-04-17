import { supabase } from "./supabase"

export interface Invoice {
  id: string
  client: string
  email: string
  start_date: string
  due_date: string
  amount: number
  status: "Paid" | "Pending" | "Unpaid"
}

async function createInvoicesTable() {
  const { error } = await supabase.rpc("create_invoices_table")
  if (error) {
    console.error("Error creating invoices table:", error)
    return false
  }
  return true
}

async function checkTableExists() {
  const { data, error } = await supabase.from("invoices").select("id").limit(1)

  if (error && error.code === "42P01") {
    console.log("Invoices table does not exist. Attempting to create it...")
    return await createInvoicesTable()
  }

  return !error
}

export async function initializeDatabase() {
  const tableExists = await checkTableExists()
  if (!tableExists) {
    console.error("Failed to create or verify the invoices table.")
    return false
  }
  return true
}

export async function getInvoices() {
  const { data, error } = await supabase.from("invoices").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching invoices:", error)
    return []
  }

  return data as Invoice[]
}

export async function createInvoice(invoice: Omit<Invoice, "id">) {
  const { data, error } = await supabase.from("invoices").insert([invoice]).select()

  if (error) {
    console.error("Error creating invoice:", error)
    return null
  }

  return data[0] as Invoice
}

export async function updateInvoice(id: string, updates: Partial<Invoice>) {
  const { data, error } = await supabase.from("invoices").update(updates).eq("id", id).select()

  if (error) {
    console.error("Error updating invoice:", error)
    return null
  }

  return data[0] as Invoice
}

export async function deleteInvoice(id: string) {
  const { error } = await supabase.from("invoices").delete().eq("id", id)

  if (error) {
    console.error("Error deleting invoice:", error)
    return false
  }

  return true
}

