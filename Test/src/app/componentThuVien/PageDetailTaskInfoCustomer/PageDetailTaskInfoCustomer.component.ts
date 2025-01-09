import { DataService } from '../../Service/DataService';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule, formatDate } from '@angular/common';
import { CustomerInfo } from '../../Key/KeyInformationContainer';
import { ApiService } from '../../Service/ApiService';
import {MatButtonModule} from '@angular/material/button';

import { ThongBaoComponent } from '../ThuVien/Notice/Notice.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';

import { MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer} from '@angular/cdk/a11y';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Notification, Title } from '../../Key/KeyNotice';
import { DetailTaskListRepairDone } from '../../Model/DetailTaskListRepairDone.Model';


@Component({
  selector: 'app-page-detail-task-info-customer',
  imports: [MatFormFieldModule,FormsModule,MatIconModule,FormsModule,CommonModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatSortModule],
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
  status: number = 0;
  
  totalAmount : number = 0;
  ELEMENT_DATA: DetailTaskListRepairDone[] = [];

  dataNotice = Notification;
  dataTilte = Title;

  displayedColumns: string[] = ['RepairPartName','Price','Amount'];
  dataSource: any;             

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
        this.status = data.status;
      }
      else {
        console.error('Data or maPhieu không có');
      }
    this.idUser = this.dataService.getUserId();
    console.log("idUser:" + this.idUser+ "/idTask:" +this.idTask);
    });
  }
  ngOnInit(): void {      
    this.getDataFormExitFormPage(); 
    this.getDetailsTask(this.idTask);
    this.fetchData();
  }

  fetchData() {
    // Mô phỏng việc lấy dữ liệu từ API
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },300); // Giả lập thời gian tải dữ liệu
  }

  getDetailsTask(idTask: number)
  {
    this.api.getDetailTaskListRepairPartsDone(idTask)
    .subscribe(
      (data) => {
         console.log(data.toRepairPartList);
         this.ELEMENT_DATA = data.toRepairPartList as DetailTaskListRepairDone[];

          // nạp dữ liệu vào table
         this.dataSource = new MatTableDataSource<DetailTaskListRepairDone>(this.ELEMENT_DATA);

          this.dataDetail['CustomerName'] = this.ELEMENT_DATA[0].CustomerName;
          this.dataDetail['CustomerPhone'] = this.ELEMENT_DATA[0].CustomerPhone;
          this.dataDetail['ReasonBringFix'] = this.ELEMENT_DATA[0].ReasonBringFix;
          // if ( == 0)
          //   this.dataDetail['StatusTask'] = "Đang xử lý";
          // else if(this.ELEMENT_DATA[0].StatusTask == 1)
            this.dataDetail['StatusTask'] = this.ELEMENT_DATA[0].StatusTask;
          this.totalAmount = this.ELEMENT_DATA.reduce((sum,item) => sum + (item.Amount*item.Price),0)
          console.log("totalAmount" + this.totalAmount);
      }
    ); 
  }

  ReturnExitPage()
  {
    this.router.navigate(['/mainApp/task']);
    this.dataService.setData({chooseItemNav: 'task'});
  }
}
