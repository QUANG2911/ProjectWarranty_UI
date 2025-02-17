import { DataService } from '../../Service/DataService';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule, formatDate, formatNumber } from '@angular/common';
import { CustomerInfo } from '../../Key/KeyInformationContainer';
import { ApiService } from '../../Service/ApiService';
import {MatButtonModule} from '@angular/material/button';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';

import { MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer} from '@angular/cdk/a11y';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Notification, Title } from '../../Key/KeyNotice';
import { DetailTaskListRepairDone } from '../../Model/DetailTaskListRepairDone.Model';
import { PageDetailTaskInfoRepairPartDoneComponent } from "../PageDetailTaskInfoRepairPartDone/PageDetailTaskInfoRepairPartDone.component";
import { DetailTaskCustomer } from '../../Model/DetailTaskCustomer.Model';
import { PageDetailTaskInfoRepairPartNotDoneComponent } from "../PageDetailTaskInfoRepairPartNotDone/PageDetailTaskInfoRepairPartNotDone.component";


@Component({
  selector: 'app-page-detail-task-info-customer',
  imports: [MatFormFieldModule, FormsModule, MatIconModule, FormsModule, CommonModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, PageDetailTaskInfoRepairPartDoneComponent, PageDetailTaskInfoRepairPartNotDoneComponent],
  templateUrl: './PageDetailTaskInfoCustomer.component.html',
  styleUrl: './PageDetailTaskInfoCustomer.component.css'
})
export class PageDetailTaskInfoCustomerComponent implements OnInit{
  dataDetail: { [key: string]: string | number |Date}={};

  private _liveAnnouncer = inject(LiveAnnouncer);

  // hàm sắp xếp
  @ViewChild(MatSort) sort!: MatSort;

  //hàm list page
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // keyDetail = Detail;
  
  keyTrans = CustomerInfo.filter(p =>p.field === 'CustomerName' || p.field === 'CustomerPhone' || p.field === 'StatusTask' || p.field === 'ReasonBringFix');
  amountKey : number = this.keyTrans.length;
  // lấy dữ liệu của API gửi lên
  idCustomer : number =0;

  idUser: number =0;
  idTask: number = 0;
  status!: number;
  
  totalAmount : number = 0;
  ELEMENT_DATA!: DetailTaskCustomer;

  dataNotice = Notification;
  dataTilte = Title;      

  readonly dialog = inject(MatDialog);
  
  constructor(
              private dataService :DataService,
              private api :ApiService,
              private router: Router
             ){}
  
   // mũi tên hiện sắp xếp
   announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getDataFormExitFormPage()
  {
    this.dataService.getData();
    this.dataService.currentData.subscribe((data) => {
      if (data) {  // Kiểm tra data 
        this.idTask = data.idTask;
        this.totalAmount = data.totalAmount;
      }
      else {
        console.error('Data or maPhieu không có');
      }
    this.idUser = this.dataService.getUserId();
    });
  }
  ngOnInit(): void {      
    this.getDataFormExitFormPage(); 
    this.getDetailsTask(this.idTask);
  }

  getDetailsTask(idTask: number)
  {
    this.api.getDetailTaskCustomer(idTask)
    .subscribe(
      (data) => {
         this.ELEMENT_DATA = data as DetailTaskCustomer;

          this.dataDetail['CustomerName'] = this.ELEMENT_DATA.CustomerName;
          this.dataDetail['CustomerPhone'] = this.ELEMENT_DATA.CustomerPhone;
          this.dataDetail['ReasonBringFix'] = this.ELEMENT_DATA.ReasonBringFix;
          this.dataDetail['StatusTask'] = this.ELEMENT_DATA.StatusTask;

          this.status = this.ELEMENT_DATA.StatusTask;
      }
    ); 
  }

  ReturnExitPage()
  {
    this.router.navigate(['/mainApp/task']);
    this.dataService.setData({chooseItemNav: 'task'});
  }
}
