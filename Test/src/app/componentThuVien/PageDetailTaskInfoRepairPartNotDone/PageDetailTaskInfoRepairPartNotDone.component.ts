import { Component, OnDestroy, OnInit,ViewChild,inject } from '@angular/core';
import { DataService } from '../../Service/DataService';
import { ApiService } from '../../Service/ApiService';
import { Router } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';;
import {CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';


import {MatDialog } from '@angular/material/dialog';
import {ThongBaoComponent } from '../ThuVien/Notice/Notice.component';


//khai báo table
import { MatTableDataSource, MatTableModule} from '@angular/material/table';

//khai báo page
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


// khai báo sort
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { Notification, Title } from '../../Key/KeyNotice';
import { RepairPart } from '../../Model/RepairPart.Model';
import { selectList } from '../../Model/SelectList.model';
import { identity } from 'rxjs';


@Component({
  selector: 'app-page-detail-task-info-repair-part-not-done',
  imports: [
            FormsModule,
            ReactiveFormsModule,
            MatButtonModule,
            CommonModule,
            MatSelectModule,
            MatTableModule,
            //MatPaginator,
            MatSortModule, 
            MatPaginatorModule,
            MatCardModule, MatCheckboxModule, FormsModule,
            MatIconModule],
  templateUrl: './PageDetailTaskInfoRepairPartNotDone.component.html',
  styleUrl: './PageDetailTaskInfoRepairPartNotDone.component.css'
})
export class PageDetailTaskInfoRepairPartNotDoneComponent implements OnInit{
  constructor( 
    private dataService: DataService,
    private api: ApiService,
    private router: Router,
  ){
  }

idUser: string ="";

ELEMENT_DATA: RepairPart[] = [];

displayedColumns: string[] = ['IdRepairPart','RepairPartName','Price','amount','choose'];
dataSource: any;             

originalData: RepairPart[] = []; 

 //hàm list page
//  @ViewChild(MatPaginator) paginator!: MatPaginator;
 // keyDetail = Detail;
 
idTask: number = 0;
total:  number = 0;
dataNotice = Notification;
dataTilte = Title;
item !: string ;

////////////check box////////////
dsSelectContainer : selectList[] = [] ;

repairPart !: selectList;

readonly dialog = inject(MatDialog);

// shorrt  
@ViewChild(MatSort) sort!: MatSort;
private _liveAnnouncer = inject(LiveAnnouncer);

getDataFormExitForm()
{
  this.dataService.getData();
  this.dataService.currentData.subscribe(data =>{
    if(data != null)  
    {
      this.idTask = data.idTask;     
    }        
    else 
      console.log("Không có idUser truyền qua");
  })
  this.idUser = this.dataService.getUserId();
}

ngOnInit(): void {
  this.getDataFormExitForm();
  this.getRepairPartList(this.idUser);
  this.fetchData();
  
}

fetchData() {
  // Mô phỏng việc lấy dữ liệu từ API
  setTimeout(() => {
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  },500); // Giả lập thời gian tải dữ liệu
}

// mũi tên hiện sắp xếp
announceSortChange(sortState: Sort) {
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}

getRepairPartList(idUser: string)
{
  this.api.getRepairPartList()
  .subscribe(
    (data) => {
      if(data != null)
      {
        this.ELEMENT_DATA = data.toListRepairPast as RepairPart[];

        // nạp dữ liệu vào table
        this.dataSource = new MatTableDataSource<RepairPart>(this.ELEMENT_DATA);

        this.originalData = this.ELEMENT_DATA;

      }           
      else console.log('Không nhận được dữ liệu');        
    }
  ); 
}

SearchRepairPart(inputRepairPartName : any)
{
  if(inputRepairPartName.value != null)
  {
    this.dataSource.data = this.originalData.filter(p=>p.RepairPartName.toLowerCase().includes(inputRepairPartName.value.toLowerCase()));
  }
  else {
    this.dataSource.data = this.originalData;
  }
  
}

TakeAmount(inputAmount: any, idRepairPart: number, price: number) {
  console.log("price:", price, "/inputAmount:", inputAmount.value);

  const index = this.dsSelectContainer.findIndex(p => p.idRepairPart === idRepairPart);
  if (index === -1) {
    console.error("Không tìm thấy phần tử với idRepairPart:", idRepairPart);
    return;
  }

  const currentAmount = Number(this.dsSelectContainer[index]?.amount) || 0;
  const validPrice = !isNaN(price) ? price : 0;

  // Trừ đi giá trị hiện tại
  this.total = (this.total || 0) - validPrice * currentAmount;

  // console.log("Khi bắt đầu chạy TakeAmount:", this.total);

  if (inputAmount.value !== null) {
    const newAmount = Number(inputAmount.value) || 0;
    this.dsSelectContainer[index].amount = newAmount;

    if (newAmount > 0) {
      this.total = this.total + validPrice * newAmount;
    }
  }

  console.log("Khi chạy xong TakeAmount:", this.total);
  this.dataService.setData({idTask: this.idTask, totalAmount: this.total}); 
}

 


checkIfSelected(idRepairPart : number, price: number)
{
    let index = this.dsSelectContainer.filter(p=> p.idRepairPart === idRepairPart)

    if(index.length > 0)
    {
      this.dsSelectContainer = this.dsSelectContainer.filter(p => p.idRepairPart != idRepairPart);
      this.total = this.total - price * Number(index[0].amount);
    }
    else
    {
      this.dsSelectContainer.push({idRepairPart:idRepairPart,amount:0,price:price});
      // this.total = this.total + price;
      this.TakeAmount(0,idRepairPart,price)
    }
    this.dataService.setData({idTask: this.idTask, totalAmount: this.total}); 
}


GetNotification(title: any, content: any, typeNotification : number, width: string, susscess: boolean)
{
  //this.dataService.setData({TilteThongBao: title, maNhap: "", NoiDungThongBao : content, LoaiThongBao: typeNotification,idUser: this.idUser,idContainer:this.idContainer });
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
        console.log("tạo thành công");
        // this.api.postNewPhieuXuat(this.idUser,this.idContainer,this.exitContainerFormToCreateNew).subscribe(
        //   (reponse) => {
        //     console.log("Api thành công: "+reponse);
        //     let title: any = this.dataTilte.find(n => n.field === 'Notice')?.label.toString();
        //     let content: any = this.dataNotice.find(n => n.field === 'CreateSuccess')?.label.toString();
        //     this.GetNotification(title,content,2,'400px',false);
        //     this.router.navigate(['/mainApp/ExitContainerForm']);
        //   },
        //   (error) =>{
        //     let title: any = this.dataTilte.find(n => n.field === 'Notice')?.label.toString();
        //     let content: any = this.dataNotice.find(n => n.field === 'CreateFail')?.label.toString();
        //     this.GetNotification(title,content,2,'400px',false);
        //   }
        // );
      }
      else
      {
        console.log("xem xét tiếp")
      }
    });
  }
} 
}
