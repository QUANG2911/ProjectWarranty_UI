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
import { DetailCustomerDeviceListItem } from '../../Model/DetailCustomerDevice.Model';

@Component({
  selector: 'app-page-detail-customer-list-device',
  imports: [MatFormFieldModule,FormsModule,MatIconModule,FormsModule,CommonModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatSortModule],
  templateUrl: './PageDetailCustomerListDevice.component.html',
  styleUrl: './PageDetailCustomerListDevice.component.css'
})
export class PageDetailCustomerListDeviceComponent implements OnInit{
  dataDetail: { [key: string]: string | number |Date}={};

  private _liveAnnouncer = inject(LiveAnnouncer);

  // hàm sắp xếp
  @ViewChild(MatSort) sort!: MatSort;

  //hàm list page
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // keyDetail = Detail;
  
  keyTrans = CustomerInfo;
  // lấy dữ liệu của API gửi lên
  idCustomer : number =0;

  idUser: number =0;

  itemsToShow: number[] = [];

  ELEMENT_DATA: DetailCustomerDeviceListItem[] = [];

  dataNotice = Notification;
  dataTilte = Title;

  displayedColumns: string[] = ['IdDevice','CustomerDevice','IdWarrantReport','DateOfWarrant','TimeEnd'];
  dataSource: any;             

  readonly dialog = inject(MatDialog);

  originalData: DetailCustomerDeviceListItem[] = []; 
  
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
        this.idCustomer = data.idCustomer;
      }
      else {
        console.error('Data or maPhieu không có');
      }
    this.idUser = this.dataService.getUserId();
    console.log("idUser:" + this.idUser+ "/idCustomer:" +this.idCustomer);
    });
  }
  ngOnInit(): void {      
    this.getDataFormExitFormPage(); 
    this.getDetailsCustomerDevices(this.idUser, this.idCustomer);
    this.fetchData();
  }

  fetchData() {
    // Mô phỏng việc lấy dữ liệu từ API
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },300); // Giả lập thời gian tải dữ liệu
  }

  getDetailsCustomerDevices(idCustomer: number, idUser : number)
  {
    this.api.getDetailCustomerListDevice(idCustomer,idUser)
    .subscribe(
      (data) => {
         console.log(data);
         this.ELEMENT_DATA = data.toDeviceList as DetailCustomerDeviceListItem[];

          // nạp dữ liệu vào table
         this.dataSource = new MatTableDataSource<DetailCustomerDeviceListItem>(this.ELEMENT_DATA);

          this.dataDetail['CustomerName'] = this.ELEMENT_DATA[0].CustomerName;
          this.dataDetail['CustomerPhone'] = this.ELEMENT_DATA[0].CustomerPhone;
          this.dataDetail['CustomerEmail'] = this.ELEMENT_DATA[0].CustomerEmail;
          this.dataDetail['CustomerAdrress'] = this.ELEMENT_DATA[0].CustomerAdrress;
          
          this.originalData = this.ELEMENT_DATA;

          console.log(this.originalData);     
      }
    ); 
  }

  ReturnExitPage()
  {
    this.router.navigate(['/mainApp/customer']);
  }

}
