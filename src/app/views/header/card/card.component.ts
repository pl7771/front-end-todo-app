import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  completed = false;

  @Input()
  iconName: string;

  @Input()
  count: any;

  @Input()
  countTotal: any;

  @Input()
  title: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
