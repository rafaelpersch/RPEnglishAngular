import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories:Category[];

  constructor(private categoryService:CategoryService) { 
    this.categories = [];
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((response: any) => {
      this.categories = response;
    },
    error => {
      console.warn(error);
    });
  }

}
