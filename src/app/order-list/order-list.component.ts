import { Component, OnInit, Input } from '@angular/core';
import {Order} from "../common/order";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {OrderService} from "../services/order.service";
import { Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input() id: string | undefined;
  @Output() tlNumEvent = new EventEmitter<string>();
  @Output() uicEvent = new EventEmitter<string>();
  orders: Order[] | undefined;
  searchText: string ='';
  page: any;
  flag: boolean = false;
  loading: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private location: Location,
    public datepipe: DatePipe
  ) {
  }
  timeout(ms: number) { //pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async delay(ms: number){
    // Sleep thread for 3 seconds
    await this.timeout(ms);
    this.flag = true

  }


  ngOnInit(): void {
    if(this.id)
    {
      this.loading = true;
      this.orderService.getOrdersByFile(this.id).subscribe((orders) => {
        this.orders = orders.
        sort((a, b) => (a.docNum > b.docNum) ? 1 : -1).
        filter( (order) => order.qty > 0);
        if(this.orders){
          this.tlNumEvent.emit(this.orders[0].tlNum)
          this.uicEvent.emit(this.orders[0].uic)
        }

      });


    }else{
      this.getOrders()
      this.delay(Math.floor(Math.random() * 11) * 1000)
    }
  }

  getOrders(): void {
    this.loading = true;
    this.orderService.getOrders().subscribe(orders => {this.orders = orders.
    sort((a, b) => (a.docNum > b.docNum) ? 1 : -1).
    filter( (order) => order.qty > 0)
      this.loading = false;
    });
  }

  close(): void {
    this.location.back();
  }

  search(): void{
    if(this.searchText == '')
    {
      this.getOrders();
    }else{
      this.orderService.getOrdersByFile(this.searchText).subscribe(orders => this.orders = orders);
    }
  }

  formatCurrency(cog,amount){
    if (isNaN(amount)) {
      amount = 0;
    }

    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    if(cog.charAt(0) != '7')
    {
      amount = amount/100
    }
    return formatter.format(amount)
  }


  formatCurrencyNoCog(amount){
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(amount)
  }

  formatPercent(value){
    return Math.round(value)
  }

  cogStartsSeven(cog){
    return cog.charAt(0) == '7';
  }

  julianDate(date){
    let year = 202  + date.charAt(0)
    let day = date.substr(1)
    let new_date = new Date(year, 0); // initialize a date in `year-01-01`
    new_date = new Date(new_date.setDate(day))

    return this.datepipe.transform(new_date, 'MM/dd/yyyy');
  }


  notAnalyzed(test){
    return test =='Not Analyzed'
  }


}
