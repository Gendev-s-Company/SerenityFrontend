export type InvoiceItem = {
  description: string;
  hours: number;
  rate: number;
};

export type InvoiceData = {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  taxRate: number; // ex: 0.3 pour 30%
  company: {
    name: string; // "Studio Salford"
    phone: string;
    mail: string;
    address: string;
  };
  billedTo: {
    name: string;
    phone: string;
    address: string;
  };
  payment: {
    accountHolder: string;
    bank: string;
    accountNumber: string;
  };
  items: InvoiceItem[];
};

export const sampleInvoice: InvoiceData = {
  invoiceNumber: "01234",
  date: "May 15, 2034",
  dueDate: "June 15, 2034",
  taxRate: 0.3,
  company: {
    name: "Studio Salford",
    phone: "+123-456-7890",
    mail: "hello@reallygreatsite.com",
    address: "123 Anywhere St., Any City, ST 12345",
  },
  billedTo: {
    name: "Phyllis Schwaiger",
    phone: "+123-456-7890",
    address: "123 Anywhere St., Any City, ST 12345",
  },
  payment: {
    accountHolder: "Studio Salford",
    bank: "Really Great Bank",
    accountNumber: "0123 4567 8901",
  },
  items: [
    { description: "Content Plan", hours: 5, rate: 50 },
    { description: "Copy Writing", hours: 2, rate: 50 },
    { description: "Website Design", hours: 5, rate: 50 },
    { description: "Website Development", hours: 5, rate: 100 },
  ],
};

export function computeTotals(invoice: InvoiceData) {
  const subTotal = invoice.items.reduce(
    (sum, item) => sum + item.hours * item.rate,
    0
  );
  const tax = subTotal * invoice.taxRate;
  const total = subTotal + tax;
  return { subTotal, tax, total };
}

export function formatUSD(value: number) {
  return `$${value.toFixed(2)}`;
}
