import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../base/base.component';
import { Word } from '../models/word';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent extends BaseComponent implements OnInit {

  words:Word[];

  constructor(private wordService:WordService, toastr: ToastrService) { 
    super(toastr); 

    this.words = [];
  }

  ngOnInit(): void {
    this.showProgress();

    this.wordService.getWords().subscribe((response: any) => {
      this.words = response;
      this.hideProgress();
    },
    error => {
      console.warn(error);
      this.hideProgress();
    });
  }

  delete(id:string): void {
    if (confirm('Deseja excluir?')){
      this.showProgress();
      alert("s: " + id);
      //processar
      this.hideProgress();
    }
  }
}