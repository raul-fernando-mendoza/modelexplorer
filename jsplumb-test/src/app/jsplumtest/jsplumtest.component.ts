import { AfterViewInit, Component } from '@angular/core';
import { JsplumbService } from '../jsplumb.service';
import { StraightConnector } from "@jsplumb/core"
import { BezierConnector } from '@jsplumb/connector-bezier';


@Component({
  selector: 'jsplumb-test',
  templateUrl: './jsplumtest.component.html',
  styleUrls: ['./jsplumtest.component.css']
})
export class JsPlumbComponent implements AfterViewInit{

  constructor(private jsplumbService: JsplumbService){

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
    instance.draggable("control1", {"containment": "true"})
    instance.addEndpoint("control1", {
      endpoint: "Dot",  // rectangle, blank, image
      anchor: ["Top"],
      isSource: true,
      connectionType: "red-connection",
      maxConnections:1,
      id:"endpoint",
      uuid:"someuid"
      
    });  
    instance.addEndpoint("control2", {
      endpoint: "Dot",
      anchor: ["Bottom"],
      isTarget: true,
      connectionType: "red-connection",
      maxConnections:1
    }); 

    instance.connect({
      source:"control1",
      target:"control2",
      endpoint:"Dot",
      label:"my conneccion\nsecond line",
      anchors:["BottomRight","TopLeft"],
      connector:[
        "Bezier",
        {
            curviness: 50
        }
      ],
      overlays:[ 
        [ "Arrow", {location:1} ],
        [ 
            "Label", 
            { label:"foo", location:0.25, id:"myLabel" } 
        ]
    ]          
    })

    instance.bind("connection", function(connection, originalEvent) {

      alert("you clicked on $(connection.sourceId) " + connection.sourceId + " " + connection.targetId);
      
  
    });
  }
  title = 'jsplumb-test';
}
