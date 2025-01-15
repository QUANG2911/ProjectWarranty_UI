import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:5220/api/'; // URL API Backend

  private dataSubject = new BehaviorSubject<any[]>([]); // Subject để giữ dữ liệu
  public data$ = this.dataSubject.asObservable(); // Observable cho component subscribe

  constructor(private http: HttpClient) {}

   // Phương thức tạo header chung
   private createAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      authorization: `Bearer ${localStorage.getItem('jwt')}`
    });
  }

  ////////////////////////////API TASK MANAGER//////////////////////////////
  getDetailTaskListRepairPartsDone(idTask: number): Observable<any> {
    return this.http.get(this.baseUrl +'RepairManagement/ReadRepairDone/' + idTask);
  }

  postCreateNewTask(data: any): Observable<any>{    
    return this.http.post<any>(this.baseUrl + 'RepairManagement/CreateRepairManagement' ,data);
  }

  getListTask(userId : number): Observable<any>
  {
    const headers = this.createAuthHeaders();
    return this.http.get(this.baseUrl +'RepairManagement/ListRepairManagement/' + userId,{headers});
  }

  getDetailTaskCustomer(idTask : number): Observable<any>
  {
    return this.http.get(this.baseUrl +'RepairManagement/ReadRepairCustomer/' + idTask);
  }

  putTaskNotDoneToDone(userId : number, idTask: number, statusTask: number, data: any): Observable<any>
  {
    const headers = this.createAuthHeaders();
    return this.http.put(this.baseUrl + 'RepairManagement/UpdateRepairManagement/' + userId +'/'+idTask+'/'+statusTask,data,{headers});
  }
   ////////////////////////////API RepairPart//////////////////////////////
  getRepairPartList(): Observable<any>
  {
    return this.http.get(this.baseUrl+'RepairPartManagement/ListRepairPartManagement');
  }

  ///////////////////////////API CUSTOMER////////////////////////////
  getDetailCustomerListDevice(userId: number, idCustomer: number): Observable<any>
  {
    const headers = this.createAuthHeaders();
    return this.http.get(this.baseUrl +'CustomerManagement/ReadCustomerManagement/' + userId +"/" +idCustomer,{headers});
  }

  getListCustomer(userId: number): Observable<any>
  {

    const headers = this.createAuthHeaders();
    return this.http.get(this.baseUrl +'CustomerManagement/ListCustomerManagement/' + userId,{headers});
  }

  ///////////////////////////API LOGIN////////////////////////////
  getLoginUser(userId : string, pass : string): Observable<any>
  {
    return this.http.get(this.baseUrl + 'LoginManagement/GetLogin/'+userId + "/" + pass).pipe(
      tap((reponse: any) =>{
        localStorage.setItem('jwt',reponse.token);
        console.log(reponse.token);
      })
    );
  }

  ///////////////////////////API LOGIN////////////////////////////
  getWarrantyRecordManagement(userId : number): Observable<any>
  {
    const headers = this.createAuthHeaders();
    return this.http.get(this.baseUrl + 'WarrantyRecordManagement/GetListWarrantyRecordManagement/'+userId,{headers});
  }
}
