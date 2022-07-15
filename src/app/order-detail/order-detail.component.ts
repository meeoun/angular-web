import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../common/order";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../services/order.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order | undefined;
  key: string;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private location: Location
  ) {
    this.key = '';
  }

  ngOnInit(): void {
    this.key = this.route.snapshot.params.key;
    this.orderService.getOrder(this.key).subscribe(order => this.order = order);
  }


  orderMessages(): string{
    if(this.order?.messages){
      return this.order?.messages.join('\n');
    }
    return '';
  }


}
