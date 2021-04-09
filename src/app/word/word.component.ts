import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../base/base.component';
import { Category } from '../models/category';
import { Word } from '../models/word';
import { CategoryService } from '../services/category.service';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent extends BaseComponent implements OnInit {

  word: Word;
  categories:Category[];
  form: FormGroup;
  clickSubmit:boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private wordService:WordService, private categoryService:CategoryService, private formBuilder: FormBuilder, private router: Router, toastr: ToastrService) { 
    super(toastr); 
    
    this.word = new Word()
    this.categories = [];

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      translation : [null, Validators.required],
      observation : [],
      categoryId : [null, Validators.required],
    },{updateOn:'submit'});

    this.loadCategories();
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.id != '' && this.activatedRoute.snapshot.params.id != undefined){

      this.word.id = this.activatedRoute.snapshot.params.id;

      this.showProgress();

      this.wordService.getWord(this.word.id).subscribe((response: any) => {
        this.word = response;
        this.hideProgress();
      },
      error => {
        this.showError(error.error);
        this.hideProgress();
      });      
    }
  }

  saveWord():void {
    this.clickSubmit = true;

    if (!this.form.valid){
      return;
    }

    this.showProgress();

    if (this.word.id == ''){
      this.word.id = '00000000-0000-0000-0000-000000000000';
      this.wordService.postWord(this.word).subscribe((response: any) => {
        this.router.navigate(['words']);
        this.hideProgress();
      },
      error => {
        this.showError(error.error);
        this.hideProgress();
      });   
    }else{
      this.wordService.putWord(this.word).subscribe((response: any) => {
        this.router.navigate(['words']);
        this.hideProgress();
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
