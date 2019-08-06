import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelefoneComponent } from './telefone/telefone.component';
import { CpfComponent } from './cpf/cpf.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ComponentHostDirective } from './component-host.directive';
import { HttpClientModule } from '@angular/common/http';
import { InteressesComponent } from './interesses/interesses.component';
import { FormComponent } from './form/form.component';
import { Linha1Component } from './linha1/linha1.component';
import { Linha2Component } from './linha2/linha2.component';

@NgModule({
  declarations: [
    AppComponent,
    TelefoneComponent,
    CpfComponent,
    CategoriaComponent,
    ComponentHostDirective,
    InteressesComponent,
    FormComponent,
    Linha1Component,
    Linha2Component
  ],
  entryComponents: [
    TelefoneComponent,
    CpfComponent,
    CategoriaComponent,
    InteressesComponent,
    FormComponent,
    Linha1Component,
    Linha2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
