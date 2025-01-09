import { Routes } from '@angular/router';

import { SidenavComponent } from './componentThuVien/ThuVien/SideNav/SideNav.component';
import { LoginInComponent } from './componentThuVien/Login/Login.component';
import { MainAppComponent } from './componentThuVien/MainApp/MainApp.component';
import { PageCustomerComponent } from './componentThuVien/PageCustomer/PageCustomer.component';
import { PageCreateTaskComponent } from './componentThuVien/PageCreateTask/PageCreateTask.component';
import { PageManagementWarrantyComponent } from './componentThuVien/PageManagemenWarranty/PageManagemenWarranty.component';
import { PageManagementCustomerComponent } from './componentThuVien/PageManagementCustomer/PageManagementCustomer.component';
import { PageManagementTaskComponent } from './componentThuVien/PageManagementTask/PageManagementTask.component';
import { PageDetailCustomerListDeviceComponent } from './componentThuVien/PageDetailCustomerListDevice/PageDetailCustomerListDevice.component';
import { PageDetailTaskInfoCustomerComponent } from './componentThuVien/PageDetailTaskInfoCustomer/PageDetailTaskInfoCustomer.component';





export const routes: Routes = [
    {path: 'login',component: LoginInComponent},
    {path: 'mainApp',component:MainAppComponent,
        children:
        [
            {path: 'navbar',component:SidenavComponent},
            // {path: 'body', component:BodyComponent, children},
            /////////Customer////////
            {path: 'customer',component:PageManagementCustomerComponent},
            {path: 'customerDetail',component:PageDetailCustomerListDeviceComponent},
            /////////Warranty////////
            {path: 'warranty',component:PageManagementWarrantyComponent},

            /////////Task////////
            {path: 'task',component:PageManagementTaskComponent},
            {path: 'detailTaskInfoCustomer', component:PageDetailTaskInfoCustomerComponent},
            
            {path: '', redirectTo: 'customer', pathMatch: 'full' },
        ]
    },
    {path: 'customerPage', component: PageCustomerComponent},
    {path: 'createTaskPage', component:PageCreateTaskComponent},
    { path: '', redirectTo: 'customerPage', pathMatch: 'full' }, // Redirect khi không tìm thấy route
];

