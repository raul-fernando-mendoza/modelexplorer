import { AfterViewInit, Component, OnInit } from '@angular/core';
import { JsplumbService } from '../jsplumb.service';


@Component({
  selector: 'app-diagram-editor',
  templateUrl: './diagram-editor.component.html',
  styleUrls: ['./diagram-editor.component.css']
})
export class DiagramEditorComponent implements OnInit , AfterViewInit{

  constructor(private jsplumbService: JsplumbService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //this.initialize()
  }

  initialize(){


  }

}
