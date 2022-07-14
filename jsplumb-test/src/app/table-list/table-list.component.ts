import { AfterViewInit, Component, OnInit } from '@angular/core';
import { JsplumbService } from '../jsplumb.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit , AfterViewInit {

  constructor(private jsplumbService: JsplumbService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    var instance = this.jsplumbService.getInstance()
    instance.setContainer("diagram");
    instance.registerConnectionTypes({
      "red-connection": {
        paintStyle: {stroke: "red", strokeWidth: 5},
        hoverPaintStyle: {stroke: "red", strokeWidth: 10},
        connector: "Flowchart"
      }
    })    
    instance.addEndpoint("demoTable", {
      endpoint: "Dot",  // rectangle, blank, image
      anchor: ["Top"],
      isSource: true,
      connectionType: "red-connection",
      maxConnections:1,
      id:"endpointt",
      uuid:"someuidt"
      
    });  
  }
}
