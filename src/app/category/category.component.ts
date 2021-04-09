import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../base/base.component';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends BaseComponent implements OnInit {

  category: Category;
  form: FormGroup;
  clickSubmit:boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private categoryService:CategoryService, private formBuilder: FormBuilder, private router: Router, toastr: ToastrService) { 
    super(toastr); 
    
    this.category = new Category()

    this.form = this.formBuilder.group({
      name: [null, Validators.required]
    },{updateOn:'submit'});
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.id != '' && this.activatedRoute.snapshot.params.id != undefined){

      this.category.id = this.activatedRoute.snapshot.params.id;

      this.showProgress();

      this.categoryService.getCategory(this.category.id).subscribe((response: any) => {
        this.category = response;
        this.hideProgress();
      },
      error => {
        this.showError(error.error);
        this.hideProgress();
      });      
    }
  }

  saveCategory():void {
    this.clickSubmit = true;

    if (!this.form.valid){
      return;
    }

    this.showProgress();

    if (this.category.id == ''){
      this.category.id = '00000000-0000-0000-0000-000000000000';
      this.categoryService.postCategory(this.category).subscribe((response: any) => {
        this.router.navigate(['categories']);
        this.hideProgress();
      },
      error => {
        this.showError(error.error);
        this.hideProgress();
      });   
    }else{
      this.categoryService.putCategory(this.category).subscribe((response: any) => {
        this.router.navigate(['categories']);
        this.hideProgress();
      },
      error => {
        this.showError(error.error);
        this.hideProgress();
      });   
    }
  }
}