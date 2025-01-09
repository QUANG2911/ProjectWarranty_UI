import { AfterViewInit, ChangeDetectionStrategy,Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
//khai báo format bên html
import { CommonModule } from '@angular/common';
//khai báo thư viện sài cho table
import { MatTableDataSource, MatTableModule} from '@angular/material/table';

//khai báo page
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

//khai báo sort sắp xếp
import { MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer} from '@angular/cdk/a11y';

//khai báo route
import {RouterModule} from '@angular/router'; // dung routerLink

//khai bao ham con lay dữ liệu
import { DataService } from '../../Service/DataService';
import { ApiService } from '../../Service/ApiService';
import { CustomerListItem } from '../../Model/CustomerList.Model';
import { error } from 'console';

@Component({
  selector: 'app-page-management-customer',
  imports: [CommonModule, MatSortModule, MatTableModule, MatPaginatorModule, MatIconModule, FormsModule, MatFormFieldModule, FormsModule, RouterModule],
  templateUrl: './PageManagementCustomer.component.html',
  styleUrl: './PageManagementCustomer.component.css'
})
export class PageManagementCustomerComponent implements OnInit{
  private _liveAnnouncer = inject(LiveAnnouncer);

  item!: string;

  idUser : number = 0;
  constructor(private dataService :DataService,
              private api :ApiService,
             ){}
  
  ELEMENT_DATA: CustomerListItem[] = []

  //hàm list page
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading: boolean = false;
         
  //Lấy dữ liệu từ API
  getListContainer(): void{
    this.isLoading = true;
    this.api.getListCustomer(this.idUser)
    .subscribe(
      (data) => {
          //Vì dùng grpc nên phải có thêm 1 chấm gán gọi ra mảng bên kia
          this.ELEMENT_DATA = data.toCustomerList as CustomerListItem[];
          // nạp dữ liệu vào table
          this.dataSource = new MatTableDataSource<CustomerListItem>(this.ELEMENT_DATA);
          //
          this.originalData = this.ELEMENT_DATA;

          console.log(this.originalData);
          
          this.isLoading = false;      
      },
      (error) => {
        console.log(error);
      }
    ); 
  }

  getIdStaffLogin()
  {
    this.idUser = this.dataService.getUserId();
    console.log(this.idUser);
  }
  ngOnInit(): void {
    this.getIdStaffLogin();
    this.getListContainer();
    this.fetchData();
  }


  ngAfterViewInit(): void {
    this.fetchData();
  }

  fetchData() {
    // Mô phỏng việc lấy dữ liệu từ API
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 400); // Giả lập thời gian tải dữ liệu
  }

  //thêm số lượng cột ở đây
  displayedColumns: string[] = ['number', 'CustomerName', 'CustomerPhone','CustomerEmail','CustomerAddress','action'];
  dataSource: any;             

  originalData: CustomerListItem[] = []; 
  
  
   // hàm sreach  
  SearchCustomerName(inputCustomerName: any): void
  {
    this.item = inputCustomerName.value;
    if(this.item != null)
    {
      //live
     this.dataSource.data = this.originalData.filter(p=>p.CustomerName.toLowerCase().includes(this.item.toLowerCase()));
    }
    else {
      this.dataSource.data = this.originalData;
    }
  }

  // ham chuyen page detail
   TransformPageDetailCustomer(id: number): void{   
     this.dataService.setData({idCustomer: id});
   }

   
}
