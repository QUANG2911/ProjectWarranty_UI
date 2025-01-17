import { Component, inject, input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { Notification, Title } from '../../Key/KeyNotice';
import { ThongBaoComponent } from '../ThuVien/Notice/Notice.component';
import { DataService } from '../../Service/DataService';
import { ApiService } from '../../Service/ApiService';
import { TaskInformation } from '../../Model/CreateTaskInformation.Model';
import e, { response } from 'express';

@Component({
  selector: 'app-page-create-task',
  imports: [MatStepperModule,
            MatIconModule,
            FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            CommonModule,
            MatSelectModule
          ],
  templateUrl: './PageCreateTask.component.html',
  styleUrl: './PageCreateTask.component.css'
})
export class PageCreateTaskComponent implements OnInit{

  constructor(
    private router: Router,
    private dataService: DataService,
    private api: ApiService,
   ){}
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  readonly dialog = inject(MatDialog);

  dataNotice = Notification;
  dataTilte = Title;

  inputTaskInformation !: TaskInformation  ;

  width: string = '400px';
  susscess: boolean = false;
  title: any = '';
  content: any = '';
  typeNotification: number = 2;

  ngOnInit(): void {

  }

  Out()
  {
    this.router.navigate(['/customerPage']);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // return emailRegex.test(email);
    if(!emailRegex.test(email) && email!== "")
    {
      this.title = this.dataTilte.find(n => n.field === 'Warning')?.label.toString();
      this.content = this.dataNotice.find(n => n.field === 'EmailWrongFormat')?.label.toString();
      this.GetNotification(this.title,this.content,this.typeNotification,this.width,this.susscess);
      return false;
    }
    else return true;
  }
  
  isValidPhoneNumber(phoneNumber: string) : boolean {
    const phoneRegex = /^(0|\+84)[1-9][0-9]{8}$/; // Số điện thoại Việt Nam
    if(!phoneRegex.test(phoneNumber) && phoneNumber !== "")
    {
      this.title = this.dataTilte.find(n => n.field === 'Warning')?.label.toString();
      this.content = this.dataNotice.find(n => n.field === 'PhoneWrongFormat')?.label.toString();
      this.GetNotification(this.title,this.content,this.typeNotification,this.width,this.susscess);
      return false;
    }
    else return true;
  }

  FetchDataForApi(inputNameCustomer :any, inputCustomerPhone : any,inputCustomerEmail : any,inputCustomerAddress : any,inputDeviceType : any,inputResonFix: any,inputIdWarranty: any)
  {
    
    if(inputNameCustomer.value === '' || inputCustomerPhone.value === '' || inputCustomerEmail.value === '' || inputCustomerAddress.value === '' || inputDeviceType.value === '' || inputResonFix.value=== '' || inputIdWarranty.value === '')
    {
      this.title = this.dataTilte.find(n => n.field === 'Warning')?.label.toString();
      this.content = this.dataNotice.find(n => n.field === 'MissingInfo')?.label.toString();
    }
    else
    {
      if(this.isValidPhoneNumber(inputCustomerPhone.value) === true &&  this.isValidEmail(inputCustomerEmail.value))
      {
        this.inputTaskInformation = new TaskInformation(inputNameCustomer.value,inputCustomerEmail.value,inputCustomerPhone.value,inputDeviceType.value, inputIdWarranty.value, inputResonFix.value, inputCustomerAddress.value);
        console.log(this.inputTaskInformation);
        this.width = '300px';
        this.title = this.dataTilte.find(n => n.field === 'Create')?.label.toString();
        this.content = this.dataNotice.find(n => n.field === 'ConfirmCreateOrder')?.label.toString(); 
        this.typeNotification = 1;      
        this.susscess = true;
      }      
    }
    this.GetNotification(this.title,this.content,this.typeNotification,this.width,this.susscess);
  }

  GetNotification(title: string, content: string, typeNotification : number, width: string, susscess: boolean)
  {
    this.dataService.setData({TilteThongBao: title, maNhap: "", NoiDungThongBao : content, LoaiThongBao: typeNotification});
    this.openDialogApi('0ms', '0ms',width,susscess);
  }

  openDialogApi(enterAnimationDuration: string, exitAnimationDuration: string, width: string, susscess: boolean): void {
    const dialogRef =this.dialog.open(ThongBaoComponent, {
      width: width,
      enterAnimationDuration,
      exitAnimationDuration,
    });
    if(susscess == true)
      {
        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
          this.susscess = false;
          this.width = "400px";
          if (result !== undefined) // nếu chọn No là undefined
          {
            
            this.api.postCreateNewTask(this.inputTaskInformation).subscribe(
              (reponse) => {
                console.log("Api thành công: "+reponse);
                this.title = this.dataTilte.find(n => n.field === 'Notice')?.label.toString();
                this.content = this.dataNotice.find(n => n.field === 'CreateSuccess')?.label.toString();
                this.GetNotification(this.title,this.content,2,this.width,this.susscess);
                this.Out();
              },
              (error) =>{
                this.title = this.dataTilte.find(n => n.field === 'Warning')?.label.toString();
                if(error.error.message == "Phiếu bảo hành này không tồn tại")                {
                  
                  this.content = this.dataNotice.find(n => n.field === 'WarrantyReportNone')?.label.toString();
                }
                else if(error.error.message == "Phiếu bảo hành đã hết hạn")
                {
                  this.content = this.dataNotice.find(n => n.field === 'WarrantyReportTimeEnd')?.label.toString();
                }
                else if(error.error.message == "Lỗi add dữ liệu")
                {
                  this.content = this.dataNotice.find(n => n.field === 'CreateFail')?.label.toString();
                }
                else if(error.error.message == "Phiếu sửa chữa cho thiết bị này đã được nhận")
                {
                  this.width = "450px";
                  this.content = this.dataNotice.find(n => n.field === 'WarrantyReportTaskExist')?.label.toString();
                }
                this.GetNotification(this.title,this.content,2,this.width,this.susscess);
                console.log(error);
              }
            );
          }
          else
          {
            console.log("xem xét tiếp")
          }
        });
      }
  
  }
  
}
