import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../base/base.component';
import { Annotation } from '../models/annotation';
import { AnnotationService } from '../services/annotation.service';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent extends BaseComponent implements OnInit {

  annotations:Annotation[];

  constructor(private annotationService:AnnotationService, toastr: ToastrService) { 
    super(toastr); 

    this.annotations = [];
  }

  ngOnInit(): void {
    this.loadAnnotations();
  }

  delete(id:string): void {
    if (confirm('Deseja excluir?')){
      
      this.showProgress();
      
      this.annotationService.deleteAnnoration(id).subscribe((response: any) => {
        this.loadAnnotations();
      },
      error => {
        this.showError(error.error);
        this.hideProgress();
      });
    }
  }

  loadAnnotations(): void{
    this.showProgress();

    this.annotationService.getAnnorations().subscribe((response: any) => {
      this.annotations = response;
      this.hideProgress();
    },
    error => {
      this.showError(error.error);
      this.hideProgress();
    });
  }
}