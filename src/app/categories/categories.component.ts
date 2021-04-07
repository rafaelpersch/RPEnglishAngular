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
    this.showProgress();

    this.categoryService.getCategories().subscribe((response: any) => {
      this.categories = response;
      this.hideProgress();
    },
    error => {
      console.warn(error);
      this.hideProgress();
    });
  }

}
