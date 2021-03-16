import { Component } from '@angular/core';
import { BaseHttpService } from './services/base-http.service';
import { Car } from './models/car';
import { NgForm } from '@angular/forms';
import { AnnotationService } from './services/annotation.service';
import { Annotation } from './models/annotation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RPEnglishAngular';

  car = {} as Car;
  cars: Car[] = [];

  /*constructor(private carService: BaseHttpService) {
  }*/
  constructor(private annotationService: AnnotationService){}
  
  ngOnInit() {
    this.annotationService.getAnnorations().subscribe((annorations: Annotation[]) => {
      alert("success");
      console.log(annorations);
    },
    error => {
      alert("error");
      console.log("error: " + error);
      console.log(error);
    })
    //this.getCars();
  }

  // defini se um carro será criado ou atualizado
  saveCar(form: NgForm) {
    /*if (this.car.id !== undefined) {
      this.carService.put(this.car).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.carService.post(this.car).subscribe(() => {
        this.cleanForm(form);
      });
    }*/
  }

  // Chama o serviço para obtém todos os carros
  getCars() {
    /*this.carService.get().subscribe((cars: Car[]) => {
      this.cars = cars;
    });*/
  }

  // deleta um carro
  deleteCar(car: Car) {
    /*this.carService.delete(car.id);
    this.carService.deleteCar(car).subscribe(() => {
      this.getCars();
    });*/
  }

  // copia o carro para ser editado.
  editCar(car: Car) {
    this.car = { ...car };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    //this.getCars();
    form.resetForm();
    this.car = {} as Car;
  }
}