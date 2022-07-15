import {Component, Input, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-export',
  templateUrl: './excel-export.component.html',
  styleUrls: ['./excel-export.component.css']
})
export class ExcelExportComponent implements OnInit {
  @Input() fileName: string;
  @Input() element: string;
  @Input() sheetName: string;



  constructor() {
    this.fileName = "";
    this.element = "";
    this.sheetName = "";
  }

  ngOnInit(): void {
  }

  exportExcel(): void
  {
    /* table id is passed over here */
    let element = document.getElementById(this.element);
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.sheetName);

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
