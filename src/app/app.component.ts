import { Component, ComponentFactoryResolver, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ComponentHostDirective } from './component-host.directive';
import { HttpClient } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { IComponentHost } from './component-host.interface';
import { InteressesComponent } from './interesses/interesses.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(ComponentHostDirective, { static: true }) componentHost: ComponentHostDirective;

  title = 'component-factory-poc';
  interval: any;

  screenMapping = {
    Interesses: InteressesComponent,
    Form: FormComponent
  };

  firstStep = '';
  secondStep = '';

  componentInstances = [];
  currentStep = 0;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.loadComponent();
    this.getComponents();
  }

  loadComponent() {
    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();

    const richUrl = `https://integration.richrelevance.com/rrserver/api/personalize`;
    this.http.get(`${richUrl}?apiKey=56ab1488ab784010&apiClientKey=088b28bb18dee371&placements=generic_page.onboard_1`)
      .subscribe((response: any) => {
        const placements = response.placements[0].creatives[0];
        const groupedPlacements = this.groupBy(
          Object.keys(placements)
          .filter((placement) => placement.startsWith('TELA'))
        );

        Object.keys(groupedPlacements)
        .sort((a, b) => {
          const aNumber = +a.slice(-1);
          const bNumber = +b.slice(-1);
          return aNumber - bNumber;
        }).forEach((key: any) => {
          console.log(key);
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.screenMapping[placements[key]] as any);
          const componentRef = viewContainerRef.createComponent(componentFactory);
          const childComponents = groupedPlacements[key]
            .filter((groupedPlacement) => groupedPlacement !== key)
            .map((filteredGroupedPlacement) => placements[filteredGroupedPlacement]);
          (componentRef.instance as IComponentHost).setComponents(childComponents);
          this.componentInstances.push(componentRef);
        });

        this.componentInstances.forEach((instance) => { instance.instance.setHidden(true); });
        this.componentInstances[this.currentStep].instance.setHidden(false);

        this.firstStep = this.componentInstances[0].instance instanceof FormComponent
          ? `Insira seu nome e CPF` : `Selecione seus interesses`;
        this.secondStep = this.componentInstances[1].instance instanceof FormComponent
          ? `Insira seu nome e CPF` : `Selecione seus interesses`;
      });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getComponents() {
    // this.interval = setInterval(() => {
    //   this.loadComponent();
    // }, 5000);
  }

  nextStep() {
    this.currentStep = this.currentStep + 1;
    this.componentInstances.forEach((instance) => { instance.instance.setHidden(true); });
    this.componentInstances[this.currentStep].instance.setHidden(false);
  }

  previousStep() {
    this.currentStep = this.currentStep - 1;
    this.componentInstances.forEach((instance) => { instance.instance.setHidden(true); });
    this.componentInstances[this.currentStep].instance.setHidden(false);
  }

  groupBy(arr) {
    return arr.reduce((obj, item) => {
      const key = item.match(/(?:TELA)[0-9]+/)[0];

      if (!obj.hasOwnProperty(key)) {
        obj[key] = [];
      }

      obj[key].push(item);

      return obj;
    }, []);
  }
}
