import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../base/base.component';
import { Category } from '../models/category';
import { Word } from '../models/word';
import { CategoryService } from '../services/category.service';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent extends BaseComponent implements OnInit {

  categoryid:string;
  categories:Category[];
  words:Word[];

  constructor(private wordService:WordService, private categoryService:CategoryService, toastr: ToastrService) { 
    super(toastr); 

    this.words = [];
    this.categories = [];
    this.categoryid = '';
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  delete(id:string): void {
    if (confirm('Want to delete?')){

      this.showProgress();
      
      this.wordService.deleteWord(id).subscribe((response: any) => {
        this.loadWords();
      },
      error => {
        this.showError(error.error);
        this.hideProgress();
      });      
    }
  }

  loadWords(): void{
    this.showProgress();

    this.wordService.getWordsByCategory(this.categoryid).subscribe((response: any) => {
      this.words = response;
      this.hideProgress();
    },
    error => {
      this.showError(error.error);
      this.hideProgress();
    });
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

  onChangeCategory(categoryid: string): void{
    if (categoryid !== ""){
      this.categoryid = categoryid;

      this.loadWords();
    }
  }
}