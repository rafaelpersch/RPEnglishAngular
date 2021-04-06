import { Component, OnInit } from '@angular/core';
import { Annotation } from '../models/annotation';
import { AnnotationService } from '../services/annotation.service';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent implements OnInit {

  annotations:Annotation[];

  constructor(private annotationService:AnnotationService) { 
    this.annotations = [];
  }

  ngOnInit(): void {

    this.annotationService.getAnnorations().subscribe((response: any) => {
      this.annotations = response;
    },
    error => {
      console.warn(error);
    });
  }
}