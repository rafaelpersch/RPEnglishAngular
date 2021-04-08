import { Component } from '@angular/core';
import { LocalStorageKeyEnum } from '../models/localStorageKeyEnum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent {
  public currentUser: any;

  constructor(private toastr: ToastrService) { 
    this.currentUser = this.getUser();
  }

  public getUser(): any {
    const token = this.getToken();
    if (token) {
      return token.user;
    }
    return null;
  }

  public getToken(): any {
    const content = localStorage.getItem(LocalStorageKeyEnum.AUTH_TOKEN);

    if (content){
      return JSON.parse(content);
    }

    return null;
  }

  //https://www.npmjs.com/package/ngx-toastr
  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }
  
  showWarning(message: string) {
    this.toastr.warning(message);
  }      

  showProgress(): void {
    (document.querySelector('.loading') as HTMLElement).style.display = "block"; 
    (document.querySelector('.loading') as HTMLElement).style.visibility = "visible"; 
  }

  hideProgress(): void {
    (document.querySelector('.loading') as HTMLElement).style.display = "none"; 
    (document.querySelector('.loading') as HTMLElement).style.visibility = "hidden"; 
  }
}