import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../Service/DataService';
import { Option } from '../../../Model/Option.Model';

@Component({
  selector: 'app-drop-down-list',
  imports: [CommonModule],
  templateUrl: './DropDownList.component.html',
  styleUrl: './DropDownList.component.css'
})
export class DropDownListComponent implements OnInit {

  constructor(   private dataService :DataService ){}

  selectOption: any;

  defaultOption: any;
  option : Option[] =[]  ;

  userChooseNarItem : string = "";

  option1 = [
    {name: 'Trạng thái', value: -1},
    {name: 'Còn hạn', value: 1},
    {name: 'Hết hạn', value: 0},
  ];

  option2 = [
    {name: 'Trạng thái', value: -2},
    {name: 'Đã xử lý', value: 1},
    {name: 'Đang xử lý', value: 0},
    {name: 'Chưa nhận', value: -1},
  ];

  GetDataNarBar()
  {
    this.dataService.getData();
    this.dataService.currentData.subscribe((data) =>
    {
      this.userChooseNarItem = data.chooseItemNav
      // console.log("chọn nar bar " + this.userChooseNarItem);
      if(this.userChooseNarItem == "warranty")
      {
        this.option = this.option1 as Option[]
      }
      else if(this.userChooseNarItem == "task")
      {
        this.option = this.option2 as Option[]
      }

      // console.log(this.option);
    });
  }

  ngOnInit(): void {
    this.GetDataNarBar();
    this.defaultOption = this.option[0];
    this.selectOption = this.defaultOption;
  }

  chooseItem(item: any)
  {
    this.dataService.setData({selectOption: item.value});

    this.selectOption = item;
   // console.log(item.value);
  }

  removeSelect(): void {
    //this.selectOption = this.defaultOption;
    this.chooseItem(this.defaultOption)
  }
  
}
