import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ComponentHostDirective } from '../component-host.directive';
import { CpfComponent } from '../cpf/cpf.component';
import { CategoriaComponent } from '../categoria/categoria.component';
import { TelefoneComponent } from '../telefone/telefone.component';
import { IComponentHost } from '../component-host.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, IComponentHost {
  hidden: boolean;
  componentMapping = {
    Cpf: CpfComponent,
    Categoria: CategoriaComponent,
    Telefone: TelefoneComponent
  };

  @ViewChild(ComponentHostDirective, { static: true }) componentHost: ComponentHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {}


  setComponents(components: []) {
    components.forEach((component) => {
      const viewContainerRef = this.componentHost.viewContainerRef;
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.componentMapping[component] as any);
      viewContainerRef.createComponent(componentFactory);
    });
  }

  setHidden(isHidden) {
    this.hidden = isHidden;
  }
}
