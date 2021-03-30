import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    alert(this.activatedRoute.snapshot.params.id);
    alert(this.router.url);
  }

}
