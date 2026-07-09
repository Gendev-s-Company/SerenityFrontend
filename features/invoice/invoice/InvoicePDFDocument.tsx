"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { InvoiceData, computeTotals, formatUSD } from "@/lib/invoice-data";

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111111",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  logoBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  plus: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginRight: 6,
  },
  logoText: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.2,
  },
  invoiceTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
  },
  small: {
    fontSize: 9,
    color: "#333333",
    marginBottom: 2,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  sectionLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    marginTop: 10,
    marginBottom: 4,
  },
  table: {
    marginTop: 24,
  },
  tableHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#111111",
    paddingBottom: 6,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  colDescription: { width: "40%" },
  colHours: { width: "20%" },
  colRate: { width: "20%" },
  colAmount: { width: "20%", textAlign: "left" },
  tableHeaderText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#111111",
    marginTop: 30,
    marginBottom: 12,
  },
  footerTotalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalsBlock: {
    width: "45%",
    marginLeft: "auto",
  },
  totalsLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  totalsLineBold: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    fontFamily: "Helvetica-Bold",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 48,
  },
  bottomCol: {
    width: "45%",
  },
});

export default function InvoicePDFDocument({
  invoice,
}: {
  invoice: InvoiceData;
}) {
  const { subTotal, tax, total } = computeTotals(invoice);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.logoBlock}>
            <Text style={styles.plus}>+</Text>
            <Text style={styles.logoText}>
              {invoice.company.name.split(" ")[0]}
              {"\n"}
              {invoice.company.name.split(" ").slice(1).join(" ")}
            </Text>
          </View>

          <View style={{ alignItems: "flex-start" }}>
            <Text style={styles.invoiceTitle}>Invoice</Text>
            <Text style={styles.small}>Facture N°. {invoice.invoiceNumber}</Text>
            <Text style={styles.small}>Date: {invoice.date}</Text>

            <Text style={styles.sectionLabel}>Billed to:</Text>
            <Text style={styles.small}>{invoice.billedTo.name}</Text>
            <Text style={styles.small}>{invoice.billedTo.phone}</Text>
            <Text style={styles.small}>{invoice.billedTo.address}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.colDescription, styles.tableHeaderText]}>
              Description
            </Text>
            <Text style={[styles.colHours, styles.tableHeaderText]}>Heures</Text>
            <Text style={[styles.colRate, styles.tableHeaderText]}>Taux</Text>
            <Text style={[styles.colAmount, styles.tableHeaderText]}>Montant</Text>
          </View>

          {invoice.items.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.colDescription}>{item.description}</Text>
              <Text style={styles.colHours}>{item.hours}</Text>
              <Text style={styles.colRate}>${item.rate}/hr</Text>
              <Text style={styles.colAmount}>
                {formatUSD(item.hours * item.rate)}
              </Text>
            </View>
          ))}
        </View>

        {/* Divider + Totals */}
        <View style={styles.divider} />
        <View style={styles.footerTotalsRow}>
          <Text style={styles.small}>Date echeance: {invoice.dueDate}</Text>

          <View style={styles.totalsBlock}>
            <View style={styles.totalsLine}>
              <Text>Sous-Total</Text>
              <Text>{formatUSD(subTotal)}</Text>
            </View>
            <View style={styles.totalsLine}>
              <Text>Taxes ({Math.round(invoice.taxRate * 100)}%)</Text>
              <Text>{formatUSD(tax)}</Text>
            </View>
            <View style={styles.totalsLineBold}>
              <Text>Total</Text>
              <Text>{formatUSD(total)}</Text>
            </View>
          </View>
        </View>

        {/* Bottom: Contact / Payment */}
        <View style={styles.bottomRow}>
          <View style={styles.bottomCol}>
            <Text style={styles.sectionLabel}>Contact</Text>
            <Text style={styles.small}>{invoice.company.phone}</Text>
            <Text style={styles.small}>{invoice.company.mail}</Text>
            <Text style={styles.small}>{invoice.company.address}</Text>
          </View>
          <View style={styles.bottomCol}>
            <Text style={styles.sectionLabel}>Type de Paiement</Text>
            <Text style={styles.small}>{invoice.payment.accountHolder}</Text>
            <Text style={styles.small}>Bank: {invoice.payment.bank}</Text>
            <Text style={styles.small}>
              N° de compte: {invoice.payment.accountNumber}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
