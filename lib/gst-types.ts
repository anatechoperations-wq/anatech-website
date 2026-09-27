export type GstRegisterRow = {
  date: string;
  reference: string;
  customer: string;
  customerGstin: string;
  placeOfSupply: string;
  supplyType: string;
  taxableValue: number;
  taxRate: number;
  cgst: number;
  kgst: number;
  igst: number;
  total: number;
  category: "B2B" | "B2C";
};

export type GstComplianceReport = {
  period: string;
  rows: GstRegisterRow[];
  totalTaxableValue: number;
  totalCgst: number;
  totalKgst: number;
  totalIgst: number;
  totalTax: number;
  totalInvoiceValue: number;
  b2bCount: number;
  b2cCount: number;
  incompleteRows: number;
  companyGstinConfigured: boolean;
  filingReadiness: string[];
};
