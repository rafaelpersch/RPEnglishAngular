import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends BaseComponent implements OnInit {

  constructor(private authService:AuthService, toastr: ToastrService) { 
    super(toastr); 
  }

  ngOnInit(): void {
  }

  logout(): void{
    this.authService.signOut();
  }

}
