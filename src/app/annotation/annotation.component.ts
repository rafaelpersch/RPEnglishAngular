import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Annotation } from '../models/annotation';
import { AnnotationService } from '../services/annotation.service';


@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent extends BaseComponent implements OnInit {

  annotation: Annotation;
  form: FormGroup;
  clickSubmit:boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private annotationService:AnnotationService, private formBuilder: FormBuilder, private router: Router, toastr: ToastrService) { 
    super(toastr); 
    
    this.annotation = new Annotation()

    this.form = this.formBuilder.group({
      text: [null, Validators.required]
    },{updateOn:'submit'});
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.id != '' && this.activatedRoute.snapshot.params.id != undefined){

      this.annotation.id = this.activatedRoute.snapshot.params.id;

      this.showProgress();

      this.annotationService.getAnnoration(this.annotation.id).subscribe((response: any) => {
        this.annotation = response;
        this.hideProgress();
      },
      error => {
        this.showError(error.error);
        this.hideProgress();
      });      
    }
  }

  saveAnnotation():void {
    this.clickSubmit = true;

    if (!this.form.valid){
      return;
    }

    this.showProgress();

    if (this.annotation.id == ''){
      this.annotation.id = '00000000-0000-0000-0000-000000000000';
      this.annotationService.postAnnoration(this.annotation).subscribe((response: any) => {
        this.router.navigate(['annotations']);
        this.hideProgress();
      },
      error => {
        this.showError(error.error);
        this.hideProgress();
      });   
    }else{
      this.annotationService.putAnnoration(this.annotation).subscribe((response: any) => {
        this.router.navigate(['annotations']);
        this.hideProgress();
      },
      error => {
        this.showError(error.error);
        this.hideProgress();
      });   
    }
  }
}