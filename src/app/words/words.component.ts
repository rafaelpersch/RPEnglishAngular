import { Component, OnInit } from '@angular/core';
import { Word } from '../models/word';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {

  words:Word[];

  constructor(private wordService:WordService) { 
    this.words = [];
  }

  ngOnInit(): void {
    this.wordService.getWords().subscribe((response: any) => {
      this.words = response;
    },
    error => {
      console.warn(error);
    });
  }

}
