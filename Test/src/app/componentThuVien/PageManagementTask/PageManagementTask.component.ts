import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../Service/DataService';
import { ApiService } from '../../Service/ApiService';

import { MatIconModule } from '@angular/material/icon';

// khai báo format bên html
import { CommonModule } from '@angular/common';

//khai báo table
import { MatTableDataSource, MatTableModule} from '@angular/material/table';

//khai báo page
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

//khai báo router
import {Router, RouterModule} from '@angular/router'; // dung routerLink

// khai báo sort
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort,MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input'; // Nếu cần nhập liệu
import { MatButtonModule } from '@angular/material/button'; // Nếu có sử dụng button
import { DropDownListComponent } from '../ThuVien/DropDownList/DropDownList.component';
import { TaskList } from '../../Model/TaskList.Model';
import { ThongBaoComponent } from '../ThuVien/Notice/Notice.component';
import { MatDialog } from '@angular/material/dialog';
import { Notification } from '../../Key/KeyNotice';


@Component({
  selector: 'app-page-management-task',
  imports: [DropDownListComponent,MatFormFieldModule, MatOptionModule,MatInputModule,MatButtonModule,MatIconModule,MatPaginator,MatSort,MatSortModule, MatTableModule,MatPaginatorModule,CommonModule,RouterModule,FormsModule],
  templateUrl: './PageManagementTask.component.html',
  styleUrl: './PageManagementTask.component.css'
})
export class PageManagementTaskComponent implements OnInit{
  // khai báo biến
  //// biên idUser để lấy idUser từ local storage
  idUser: number = 0;  

  //// khai báo biến để lấy dữ liệu từ API và lưu dữ liệu chuyền qua các component khác
  constructor(private dataService :DataService,
              private api :ApiService,
              private router : Router
             ){}
  
  //// biến để hứng dữ liệu từ API
  ELEMENT_DATA: TaskList[] = [];
  
  //// sắp xếp
  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatSort) sort!: MatSort;

  //// list page
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //// biến để lưu giá trị vòng tròn loading
  isLoading: boolean = false;

  //// biến để lưu giá trị trạng thái show button add khi user là tài khoản Customer
  itemsToShow: number[] = [];

  //thêm số lượng cột ở đây
  displayedColumns: string[] = ['IdTask','CustomerName', 'CustomerPhone', 'IdWarrantRecord','DateOfTask','DateOfWarranty','status','action'];
  
  dataSource: any;             

  originalData: TaskList[] = []; 
  dataNotice = Notification;
  readonly dialog = inject(MatDialog);
  //Lấy dữ liệu từ API
  getListEntryForm(): void{
    this.isLoading = true;
    this.api.getListTask(this.idUser)
    .subscribe(
      (data) => {
        if(data.toList.length > 0)
        {
          this.ELEMENT_DATA = data.toList as TaskList[];

          console.log(this.ELEMENT_DATA);
          // nạp dữ liệu vào table
          this.dataSource = new MatTableDataSource<TaskList>(this.ELEMENT_DATA);
          
          this.originalData = this.ELEMENT_DATA;

          //select trạng thái
          this.getListWithStatus()
      
          this.isLoading = false;
        }           
        else console.log('Không nhận được dữ liệu');        
      },(error) =>{
        console.log(error.error.message);
        if(error.error.message === "Token hết hạn out")
        {
          this.GetNotification(this.dataNotice.find(n => n.field === 'TokenTimeLifeNotice')?.label.toString());
          this.router.navigate(['/login']);
        }
      }
    ); 
  }

  getListWithStatus()
  {
      this.dataService.getData();

      this.dataService.currentData.subscribe((data) =>
      {
        if(data.selectOption != null)
        {
          this.ListStatus(data.selectOption);
        }   
        console.log(data.selectOption);  
      });
  }

  ngOnInit(): void {
    this.idUser = this.dataService.getUserId();
    console.log("Phieu:" + this.idUser);
    this.getListEntryForm();
    this.fetchData();
  }
  
  fetchData() {
    // Mô phỏng việc lấy dữ liệu từ API
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },500); // Giả lập thời gian tải dữ liệu
  }
  
   // hàm sreach  
  SearchCustomerName(inputCustomerName: any): void
  {
    if(inputCustomerName.value != null)
    {
      this.dataSource.data = this.originalData.filter(p=>p.CustomerName.toLowerCase().includes(inputCustomerName.value.toLowerCase()));
    }
    else {
      this.dataSource.data = this.originalData;
    }
  }

  // select Trạng thái
  ListStatus(TrangThai: any):void
  {
    console.log(TrangThai);
    if(TrangThai == 1  || TrangThai == 0 || TrangThai == -1)
    {
      this.dataSource.data = this.originalData.filter( p=> p.StatusTask == TrangThai);
    }
    else{
      this.dataSource.data = this.originalData;
    }
  }

  // mũi tên hiện sắp xếp
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // ham chuyen page detail
  TransDetailTaskPage(idTask: number): void{  
    if(idTask != 0) 
    {
      this.dataService.setData({idTask: idTask});
      this.router.navigate(['/mainApp/detailTaskInfoCustomer']);
    }      
    else 
      console.log('maNhap is null');
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
