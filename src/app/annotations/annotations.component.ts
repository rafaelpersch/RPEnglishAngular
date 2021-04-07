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
    this.showProgress();

    this.annotationService.getAnnorations().subscribe((response: any) => {
      this.annotations = response;
      this.hideProgress();
    },
    error => {
      console.warn(error);
      this.hideProgress();
    });
  }
}