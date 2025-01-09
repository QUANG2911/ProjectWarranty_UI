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
import { response } from 'express';

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

  ngOnInit(): void {
    // this.api.getListTask().subscribe(response =>
    //   {
    //     console.log(response)
    //   }
    // )
  }

  Out()
  {
    this.router.navigate(['/customerPage']);
  }

  FetchDataForApi(inputNameCustomer :any, inputCustomerPhone : any,inputCustomerEmail : any,inputCustomerAddress : any,inputDeviceType : any,inputResonFix: any,inputIdWarranty: any)
  {
    let width: string = '300px';
    let susscess: boolean = false;
    let title: any = '';
    let content: any = '';
    let typeNotification: number = 2;
    if(inputNameCustomer.value === '' || inputCustomerPhone.value === '' || inputCustomerEmail.value === '' || inputCustomerAddress.value === '' || inputDeviceType.value === '' || inputResonFix.valuex=== '' || inputIdWarranty === '')
    {
      title = this.dataTilte.find(n => n.field === 'Warning')?.label.toString();
      content = this.dataNotice.find(n => n.field === 'MissingInfo')?.label.toString();
    }
    else
    {
      this.inputTaskInformation = new TaskInformation(inputNameCustomer.value,inputCustomerEmail.value,inputCustomerPhone.value,inputDeviceType.value, inputIdWarranty.value, inputResonFix.value, inputCustomerAddress.value);
      console.log(this.inputTaskInformation);
      width = '300px';
      title = this.dataTilte.find(n => n.field === 'Create')?.label.toString();
      content = this.dataNotice.find(n => n.field === 'ConfirmCreateOrder')?.label.toString(); 
      typeNotification = 1;      
      susscess = true;
    }
    this.GetNotification(title,content,typeNotification,width,susscess);
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
          if (result !== undefined) // nếu chọn No là undefined
          {
            
            this.api.postCreateNewTask(this.inputTaskInformation).subscribe(
              (reponse) => {
                console.log("Api thành công: "+reponse);
                let title: any = this.dataTilte.find(n => n.field === 'Notice')?.label.toString();
                let content: any = this.dataNotice.find(n => n.field === 'CreateSuccess')?.label.toString();
                this.GetNotification(title,content,2,'400px',false);
                this.Out();
              },
              (error) =>{
                let title: any = this.dataTilte.find(n => n.field === 'Notice')?.label.toString();
                let content: any = this.dataNotice.find(n => n.field === 'CreateFail')?.label.toString();
                this.GetNotification(title,content,2,'400px',false);
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
