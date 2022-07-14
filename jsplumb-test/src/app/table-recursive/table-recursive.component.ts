import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { JsplumbService } from '../jsplumb.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-table-recursive',
  templateUrl: './table-recursive.component.html',
  styleUrls: ['./table-recursive.component.css']
})
export class TableRecursiveComponent implements OnInit , AfterViewInit{

  constructor(private jsplumbService: JsplumbService) { }


  @Input() table:any;
  @Input() parent:any;

  @ViewChild('node') element!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    console.log(this.element.nativeElement.id)
    var instance = this.jsplumbService.getInstance()
    instance.setContainer("diagram");
    var id:string = this.element.nativeElement.id
    var parentName:string = this.parent

    if( parent ){//join with parent

      var arrayObject:[] = this.table.using

      var title:string = ""
      
        
      for (let i = 0; arrayObject && i < arrayObject.length; i++) {
        if(title != ""){
          title += "; "
        }
        title += arrayObject[i]["left"] + arrayObject[i]["operator"] + arrayObject[i]["right"]
      }
      instance.connect({
        source:parentName,
        target:id,
        endpoint:"Dot",
        
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
            { label:title, location:0.8, id:"myLabel" } 
          ],
          
        ]          
      })
    }  
  }
}
