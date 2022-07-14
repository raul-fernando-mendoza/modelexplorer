import { Injectable } from '@angular/core';
import { jsPlumb } from 'jsplumb';

@Injectable({
  providedIn: 'root'
})
export class JsplumbService {

  jsPlumbInstance = jsPlumb.getInstance();
  
  constructor() { 

  }
  getInstance(){
    return this.jsPlumbInstance
  }  
}
