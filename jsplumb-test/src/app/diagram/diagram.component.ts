import { AfterViewInit, Component, OnInit } from '@angular/core';
import { JsplumbService } from '../jsplumb.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit, AfterViewInit {

  constructor(private jsplumbService: JsplumbService) { }

  table = 
    { 
      id:"1", 
      tableName:"SUBSCRIPTION",
      filters:[
        { 
          field:"type",
          operator:"=",
          value:"5"
        },
        { 
          field:"id",
          operator:"=",
          value:"5"
        }
      ], 
      joins:[
        { 
          id:"EMPLOYEE", 
          tableName:"EMPLOYEE",
          using:[
            { 
              left:"id",
              operator:"=",
              right:"id2"
            },
            { 
              left:"version",
              operator:"=",
              right:"version2"
            }
          ],
          filters:[
            { 
              field:"job",
              operator:"=",
              value:"trainner"
            },
            { 
              field:"current",
              operator:"=",
              value:"yes"
            }
          ],
          joins:[
            {
              id:"JOBS",
              tableName:"JOBS",
              using:[
                { 
                  left:"3",
                  operator:"=",
                  right:"id4"
                },
                { 
                  left:"version4",
                  operator:"=",
                  right:"version5"
                }
              ],
              filters:[
                { 
                  field:"job",
                  operator:"=",
                  value:"trainner"
                },
                { 
                  field:"current",
                  operator:"=",
                  value:"yes"
                }
              ],
            },
            {
              id:4,
              tableName:"TYPE_JOB_TILE",
              using:[
                { 
                  left:"4",
                  operator:"=",
                  right:"id4"
                },
                { 
                  left:"version4",
                  operator:"=",
                  right:"version5"
                }
              ],
              filters:[
                { 
                  field:"job",
                  operator:"=",
                  value:"trainner"
                },
                { 
                  field:"current",
                  operator:"=",
                  value:"yes"
                }
              ],
            }

          ] 
        }
      ]
    }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initialize()
  }

  initialize(){
    var instance = this.jsplumbService.getInstance()
    instance.setContainer("diagram");
    instance.registerConnectionTypes({
      "red-connection": {
        paintStyle: {stroke: "red", strokeWidth: 5},
        hoverPaintStyle: {stroke: "red", strokeWidth: 10},
        connector: "Flowchart"
      }
    })
    instance.draggable("controlA", {"containment": "true"})
    instance.addEndpoint("controlA", {
      endpoint: "Dot",  // rectangle, blank, image
      anchor: ["Top"],
      isSource: true,
      connectionType: "red-connection",
      maxConnections:1,
      id:"endpointA",
      uuid:"someuidA"
      
    });  
    instance.addEndpoint("controlB", {
      endpoint: "Dot",
      anchor: ["Bottom"],
      isTarget: true,
      connectionType: "red-connection",
      maxConnections:1,
      id:"endpointB",
      uuid:"someuidB"      
    }); 

    instance.connect({
      source:"controlA",
      target:"controlB",
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
 
}
