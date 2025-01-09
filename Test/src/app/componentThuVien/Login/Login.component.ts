import { Component, destroyPlatform, inject, OnDestroy, OnInit, signal, ViewContainerRef } from '@angular/core';
import { ThongBaoComponent } from '../ThuVien/Notice/Notice.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../Service/DataService';
import { ApiService } from '../../Service/ApiService';
import { Router } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { Notification, Title } from '../../Key/KeyNotice';


@Component({
  selector: 'app-login-in',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,MatSelectModule],
  templateUrl: './Login.component.html',
  styleUrl: './Login.component.css'
})
export class LoginInComponent{
  //Khai báo các biến 
  ////// thông báo dialog
  readonly dialog = inject(MatDialog);

 //// khai báo biến để lấy dữ liệu từ API và lưu dữ liệu chuyền qua các component khác
  constructor(
    private dataService :DataService,
    private api :ApiService,
    private router: Router
   ){}
  
  dataNotice = Notification;
  dataTilte = Title;

  ///// khai báo nút ẩn hiện password
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
  ///// khai báo biến để hứng dữ liệu từ api
  userLogin !: string;

  //Hàm thực hiện sự kiện click button Login
  Login(inputUser : any ,inputPass : any){
    if(inputUser.value.trim() === '' || inputPass.value.trim() === '')
    {
      this.GetNotification(this.dataNotice.find(n => n.field === 'MissingLoginInfo')?.label.toString());
    }      
    else{
      this.CheckUserLogin(inputUser.value,inputPass.value)
    }
  }

  //Hàm kiểm tra thông tin đăng nhập
  CheckUserLogin(Username: string, Pass: string)
  {
    this.api.getLoginUser(Username,Pass).subscribe(
      (data) => {
      this.userLogin = data.StaffPosition;
      console.log(data);
      if(this.userLogin === null)
        {            
          this.GetNotification(this.dataNotice.find(n => n.field === 'EmployeeNotFound')?.label.toString());
        }
        else
        {
          this.dataService.setUserId(Username);
          this.dataService.setData({staffType : this.userLogin});
          console.log("login idCustomer: " + Username);
          this.router.navigate(['/mainApp']);
        }         
      },(error) =>{
        this.GetNotification(this.dataNotice.find(n => n.field === 'LoginNotFound')?.label.toString());
      }
     )
  }

  Out()
  {
    this.router.navigate(['/customerPage']);
  }
  //Hàm thông báo
  GetNotification(noiDungThongBao: any){
    this.dataService.setData({TilteThongBao: "Thông báo", NoiDungThongBao : noiDungThongBao, LoaiThongBao: 2});
    this.openDialog('0ms', '0ms');
  }
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: '400px'
    });
  }
}
