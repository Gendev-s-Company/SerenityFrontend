"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import {  formatAriary } from "@/lib/invoice-data";
import { BillingEntity } from "@/types/entity-type/billingEntity";
import { timestampToText } from "@/utils/Util";

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
  invoice: BillingEntity;
}) {
  // const { subTotal, tax, total } = computeTotals(invoice);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.logoBlock}>
            <Text style={styles.plus}>+</Text>
            <Text style={styles.logoText}>
              {invoice.company?.name?.split(" ")[0]}
              {"\n"}
              {invoice.company?.name?.split(" ").slice(1).join(" ")}
            </Text>
          </View>
      
          <View style={{ alignItems: "flex-start" }}>
            <Text style={styles.invoiceTitle}>Invoice</Text>
            <Text style={styles.small}>Facture N°. {invoice.billID}</Text>
            <Text style={styles.small}>Date: {timestampToText(invoice.billingDate)}</Text>
      
            <Text style={styles.sectionLabel}>Billed to:</Text>
            <Text style={styles.small}>{invoice.customerID}</Text>
          </View>
        </View>
      
        {/* Table — services à la durée */}
        {invoice.durationsDetails && invoice.durationsDetails.length > 0 && (
          <View style={styles.table}>
            <Text style={styles.sectionLabel}>Services facturés à la durée</Text>
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.colDescription, styles.tableHeaderText]}>
                Description
              </Text>
              <Text style={[styles.colHours, styles.tableHeaderText]}>Heures</Text>
              <Text style={[styles.colRate, styles.tableHeaderText]}>Taux</Text>
              <Text style={[styles.colAmount, styles.tableHeaderText]}>Montant</Text>
            </View>
        
            {invoice.durationsDetails.map((item) => {
              const hours =
                (new Date(item.endTime).getTime() - new Date(item.startTime).getTime()) /
                (1000 * 60 * 60);
              return (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={styles.colDescription}>{item.serviceName}</Text>
                  <Text style={styles.colHours}>{hours.toFixed(1)}h</Text>
                  <Text style={styles.colRate}>{formatAriary(item.unitPrice)}/h</Text>
                  <Text style={styles.colAmount}>
                    {formatAriary(hours * item.unitPrice)}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
    
        {/* Table — services à la quantité */}
        {invoice.quantityDetails && invoice.quantityDetails.length > 0 && (
          <View style={styles.table}>
            <Text style={styles.sectionLabel}>Services facturés à la quantité</Text>
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.colDescription, styles.tableHeaderText]}>
                Description
              </Text>
              <Text style={[styles.colHours, styles.tableHeaderText]}>Quantité</Text>
              <Text style={[styles.colRate, styles.tableHeaderText]}>Prix unitaire</Text>
              <Text style={[styles.colAmount, styles.tableHeaderText]}>Montant</Text>
            </View>
        
            {invoice.quantityDetails.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.colDescription}>{item.serviceName}</Text>
                <Text style={styles.colHours}>{item.quantity}</Text>
                <Text style={styles.colRate}>{formatAriary(item.unitPrice)}</Text>
                <Text style={styles.colAmount}>
                  {formatAriary(item.quantity * item.unitPrice)}
                </Text>
              </View>
            ))}
          </View>
        )}
    
        {/* Divider + Totals */}
        <View style={styles.divider} />
        <View style={styles.footerTotalsRow}>
          {/* <Text style={styles.small}>Date echeance: {timestampToText(invoice.dueDate)}</Text> */}
      
          <View style={styles.totalsBlock}>
            <View style={styles.totalsLine}>
              <Text>Sous-Total</Text>
              <Text>{formatAriary(invoice.totalHT!)}</Text>
            </View>
            <View style={styles.totalsLine}>
              <Text>Taxes</Text>
              <Text>{formatAriary(invoice.taxe)}</Text>
            </View>
            <View style={styles.totalsLineBold}>
              <Text>Total</Text>
              <Text>{formatAriary(invoice.totalTTC!)}</Text>
            </View>
          </View>
        </View>
      
        {/* Bottom: Contact / Payment */}
        <View style={styles.bottomRow}>
          <View style={styles.bottomCol}>
            <Text style={styles.sectionLabel}>Contact</Text>
            <Text style={styles.small}>{invoice.company?.phone}</Text>
            <Text style={styles.small}>{invoice.company?.mail}</Text>
          </View>
          <View style={styles.bottomCol}>
            <Text style={styles.sectionLabel}>Paiement</Text>
            <Text style={styles.small}>{invoice.company?.name}</Text>
            <Text style={styles.small}>
              Total: {invoice.totalAmount}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
