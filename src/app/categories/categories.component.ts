import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../base/base.component';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent extends BaseComponent implements OnInit {

  categories:Category[];

  constructor(private categoryService:CategoryService, toastr: ToastrService) { 
    super(toastr); 

    this.categories = [];
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  delete(id:string): void {
    if (confirm('Want to delete?')){

      this.showProgress();
      
      this.categoryService.deleteCategory(id).subscribe((response: any) => {
        this.loadCategories();
      },
      error => {
        this.showError(error.error);
        this.hideProgress();
      });      
    }
  }

  loadCategories(): void{
    this.showProgress();

    this.categoryService.getCategories().subscribe((response: any) => {
      this.categories = response;
      this.hideProgress();
    },
    error => {
      this.showError(error.error);
      this.hideProgress();
    });
  }  
}