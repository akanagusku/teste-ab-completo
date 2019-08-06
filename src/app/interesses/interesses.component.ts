import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { IComponentHost } from '../component-host.interface';
import { Linha1Component } from '../linha1/linha1.component';
import { Linha2Component } from '../linha2/linha2.component';
import { ComponentHostDirective } from '../component-host.directive';

@Component({
  selector: 'app-interesses',
  templateUrl: './interesses.component.html',
  styleUrls: ['./interesses.component.scss']
})
export class InteressesComponent implements OnInit, IComponentHost {
  hidden: boolean;
  componentMapping = {
    Linha1: Linha1Component,
    Linha2: Linha2Component
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
