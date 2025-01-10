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
import { WarramtyRecordList } from '../../Model/WarrantyList.Model';
import { timeEnd } from 'console';
import { DropDownListComponent } from "../ThuVien/DropDownList/DropDownList.component";
@Component({
  selector: 'app-page-management-warranty',
  imports: [CommonModule, MatSortModule, MatTableModule, MatPaginatorModule, MatIconModule, FormsModule, MatFormFieldModule, FormsModule, RouterModule, DropDownListComponent],
  templateUrl: './PageManagemenWarranty.component.html',
  styleUrl: './PageManagemenWarranty.component.css'
})
export class PageManagementWarrantyComponent implements OnInit, AfterViewInit{
 

  item!: string;

  currentDate: Date = new Date();

  constructor(private dataService :DataService,
              private api :ApiService,
             ){}
  
  ELEMENT_DATA: WarramtyRecordList[] = []
  idUser :number = 0;
  // hàm sắp xếp
  @ViewChild(MatSort) sort!: MatSort;
  private _liveAnnouncer = inject(LiveAnnouncer);
  
  //hàm list page
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading: boolean = false;
         
  //Lấy dữ liệu từ API
  getListContainer(): void{
    this.isLoading = true;
    this.api.getWarrantyRecordManagement(this.idUser)
    .subscribe(
      (data) => {
        if(data.toWarrantyList.length > 0)
        {
          this.ELEMENT_DATA = data.toWarrantyList as WarramtyRecordList[];
          // nạp dữ liệu vào table
          this.dataSource = new MatTableDataSource<WarramtyRecordList>(this.ELEMENT_DATA);
          //
          this.originalData = this.ELEMENT_DATA;

          console.log(this.originalData);
          
          this.isLoading = false;

          this.getListWithStatus();
        }           
        else
        {
          this.isLoading = false;
          console.log('Không nhận được dữ liệu');        
        } 
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
      this.dataSource.sort = this.sort;
    }, 400); // Giả lập thời gian tải dữ liệu
  }

  //thêm số lượng cột ở đây
  displayedColumns: string[] = ['IdWarrantyRecord', 'CustomerName', 'DeviceName','DateOfResig','TimeEnd','status'];
  dataSource: any;             

  originalData: WarramtyRecordList[] = []; 
  
  
   // hàm sreach  
  SearchIdWarranty(inputIdWarranty: any): void
  {
    this.item = inputIdWarranty.value;
    if(this.item != null)
    {
      //live
     this.dataSource.data = this.originalData.filter(p=>p.IdWarrantyRecord.toString().toLowerCase().includes(this.item.toLowerCase()));
    }
    else {
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

  CheckStatus(TimeEnd : Date) : number
  {
    const date = new Date(TimeEnd); // đang đọc theo M/d/y
    
    if(date.getTime() < this.currentDate.getTime())
    {
      return 0
    }
    else
      return 1;
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

   // select Trạng thái
   ListStatus(TrangThai: any):void
   {
     console.log(TrangThai);
     if(TrangThai == 1  )
     {
       this.dataSource.data = this.originalData.filter( p=> new Date(p.TimeEnd).getTime() > this.currentDate.getTime());
     }
     else if (TrangThai == 0)
     {
      this.dataSource.data = this.originalData.filter( p=> new Date(p.TimeEnd).getTime() < this.currentDate.getTime());
     }
     else{
       this.dataSource.data = this.originalData;
     }
   }
 
}
