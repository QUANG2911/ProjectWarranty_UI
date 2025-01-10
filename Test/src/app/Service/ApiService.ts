import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:5220/api/'; // URL API Backend

  private dataSubject = new BehaviorSubject<any[]>([]); // Subject để giữ dữ liệu
  public data$ = this.dataSubject.asObservable(); // Observable cho component subscribe

  constructor(private http: HttpClient) {}

  ////////////////////////////API TASK MANAGER//////////////////////////////
  getDetailTaskListRepairPartsDone(idTask: number): Observable<any> {
    return this.http.get(this.baseUrl +'RepairManagement/ReadRepairDone/' + idTask);
  }

  postCreateNewTask(data: any): Observable<any>{    
    return this.http.post<any>(this.baseUrl + 'RepairManagement/CreateRepairManagement' ,data);
  }

  getListTask(userId : number): Observable<any>
  {
    return this.http.get(this.baseUrl +'RepairManagement/ListRepairManagement/' + userId);
  }

  getDetailTaskCustomer(idTask : number): Observable<any>
  {
    return this.http.get(this.baseUrl +'RepairManagement/ReadRepairCustomer/' + idTask);
  }

  putTaskNotDoneToDone(userId : string): Observable<any>
  {
    return this.http.put(this.baseUrl + 'RepairManagement/???????/' + userId ,{});
  }
   ////////////////////////////API RepairPart//////////////////////////////
  getRepairPartList(): Observable<any>
  {
    return this.http.get(this.baseUrl+'RepairPartManagement/ListRepairPartManagement');
  }

  ///////////////////////////API CUSTOMER////////////////////////////
  getDetailCustomerListDevice(userId: number, idCustomer: number): Observable<any>
  {
    return this.http.get(this.baseUrl +'CustomerManagement/ReadCustomerManagement/' + userId +"/" +idCustomer);
  }

  getListCustomer(userId: number): Observable<any>
  {
    return this.http.get(this.baseUrl +'CustomerManagement/ListCustomerManagement/' + userId);
  }

  ///////////////////////////API LOGIN////////////////////////////
  getLoginUser(userId : string, pass : string): Observable<any>
  {
    return this.http.get(this.baseUrl + 'LoginManagement/GetLogin/'+userId + "/" + pass);
  }

  ///////////////////////////API LOGIN////////////////////////////
  getWarrantyRecordManagement(userId : number): Observable<any>
  {
    return this.http.get(this.baseUrl + 'WarrantyRecordManagement/GetListWarrantyRecordManagement/'+userId );
  }
}
