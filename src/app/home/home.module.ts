import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  //export HomeComponent to allow other modules to use it.
  exports: [
    HomeComponent
  ]
})
export class HomeModule {
}
