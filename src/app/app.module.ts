import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CanvasComponent } from './core/canvas.component';




@NgModule({
  imports:      [ HttpClientModule, BrowserModule, FormsModule ],
  declarations: [ AppComponent, CanvasComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
