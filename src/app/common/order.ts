export class Order {
  expanded: boolean;
  projectCode: string;
  signalCode: string;
  tlNum: string;
  amt: number;
  listPrice: number;
  mediaStatusCode: string;
  status: string;
  priority: string;
  adviceCode: string;
  nsn: string;
  uic: string;
  rtgId: string;
  priceVariancePct: number;
  predictionPct: number;
  smic: string;
  julianDate: string;
  messages:Array<string>;
  fileId: string;
  qty: number;
  fundCode: string;
  qtyOfIssue: string;
  fyAbbr: string;
  docNum: string;
  docId: string;
  cog: string;
  id: string;

  constructor() {
    this.priceVariancePct = 0;
    this.predictionPct = 0;
    this.expanded = false;
    this.projectCode = "";
    this.signalCode = "";
    this.tlNum = "";
    this.amt = 0;
    this.listPrice = 0;
    this.mediaStatusCode = "";
    this.status = "";
    this.priority = "";
    this.adviceCode = "";
    this.nsn = "";
    this.uic = "";
    this.rtgId = "";
    this.smic = "";
    this.julianDate = "";
    this.fileId = "";
    this.messages = [];
    this.qty = 0;
    this.fundCode = "";
    this.qtyOfIssue = "";
    this.fyAbbr = "";
    this.docNum = "";
    this.docId = "";
    this.cog = "";
    this.id = "";
  }



}
