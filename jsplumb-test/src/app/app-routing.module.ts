import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { DiagramEditorComponent } from './diagram-editor/diagram-editor.component';
import { DiagramComponent } from './diagram/diagram.component';
import { JsPlumbComponent } from './jsplumtest/jsplumtest.component';

const routes: Routes = [
  { path: 'home' , component : DiagramEditorComponent},
  { path: 'test' , component : JsPlumbComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }