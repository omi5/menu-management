import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CategoryList } from 'src/app/interfaces/categoryList.interface';
import { MenuItemServiceService } from 'src/app/services/menu-item-service.service';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  constructor(private menuService: MenuItemServiceService , private location: Location){
    console.log('click form view recipe',this.selectedMenuItem);
    
  }

  @Input() itemName!: string;
  @Input() src!: string;
  @Input() ingredients!: any
  @Input() preparationTime!: number
  @Input() itemPrice!: number
  @Input() id!: string
  @Input() itemCalories!: number
  @Input() itemPortionSize!: string
  @Input() itemservingTemp!: number
  @Input() itemLastingTime!: number
  @Input() timeOfDay!: any
  @Input() categoryName! : string
  @Input() itemProfileTastyTags!: any
  @Input() itemDietaryRestrictions!: any
  @Input() recipes!: any

  ngOnInit(): void {
    this.getMenuItems();
    // this.getMenuItemById(13);
  }


  // For Modal
  // isVisible = false;
  // constructor(private modalService: NzModalService) {}
  // showModal(): void {
  //   this.isVisible = true;
  // }
  // handleOk(): void {
  //   this.isVisible = false;
  // }
  // handleCancel(): void {
  //   this.isVisible = false;
  // }

  //For Menu Item Drawer
  ItemForEdit : any;
  visible = false;
  editMenuItem(id: string): void {
    this.visible = true;
    this.getMenuItemById(id);
    this.loadingData();
    console.log('click form view recipe ',this.selectedMenuItem);
    
    
  }
  close(): void {
    this.visible = false;
  }

  
  
  //Get All Menu Item
  AllMenuItems : any[] = []
  getMenuItems(){
    this.menuService.getAllMenuItems().subscribe(res=>{
      this.AllMenuItems.push(...res);
    })
  }

  //get Menu Item By Id
  selectedMenuItem :any = [] ;
 
  getMenuItemById(id: any){
    this.menuService.getMenuItemById(id).subscribe(res=>{
      this.selectedMenuItem.push(res);
      console.log(" Menu Item b======y", res);
      return res;
    })
  }

  form = new FormGroup({
    itemName: new FormControl(),
    itemProfileTastyTags: new FormControl(),
    itemPrice: new FormControl(),
    itemPreparationtime: new FormControl(),
    itemPortionsize: new FormControl(),
    itemCalories: new FormControl(),
    itemDietaryRestrictions: new FormControl(),
    itemImage: new FormControl(),
    servingTemperature: new FormControl(),
    timeOfDay: new FormControl(),
    itemDescription: new FormControl(),
    itemPackingType: new FormControl(),
    itemLastingTime: new FormControl(),
    itemCategory: new FormControl(),
    typeOfFood: new FormControl(),
    
   })
   loadingData(){
    this.form.patchValue({
      itemName: this.selectedMenuItem[0].item.itemName,
      itemProfileTastyTags:this.selectedMenuItem[0].item.itemProfileTastyTags,
      itemPrice:this.selectedMenuItem[0].item.itemPrice,
      itemPreparationtime:this.selectedMenuItem[0].item.itemPreparationtime,
      itemPortionsize:this.selectedMenuItem[0].item.itemPortionsize,
      itemCalories : this.selectedMenuItem[0].item.itemCalories,
      itemDietaryRestrictions: this.selectedMenuItem[0].item.itemDietaryRestrictions,
      itemImage: this.selectedMenuItem[0].item.itemImage,
      servingTemperature: this.selectedMenuItem[0].item.servingTemperature,
      timeOfDay: this.selectedMenuItem[0].item.timeOfDay,
      itemDescription:this.selectedMenuItem[0].item.itemDescription,
      itemPackingType:this.selectedMenuItem[0].item.itemPackingType,
      itemLastingTime:this.selectedMenuItem[0].item.itemLastingTime,
      typeOfFood: this.selectedMenuItem[0].item.typeOfFood,
      itemCategory:this.selectedMenuItem[0].category





      
    })
   }
   onsubmit(){
    console.log(this.form.value);
    
   }
   listOfOptionForTastyTags=[1,2,3]
  


   

  //Delete a Menu Item 
  deleteMenuItem(id: string){
    this.menuService.deleteMenuItem(id).subscribe(res=>{
      console.log("Deleted Successfully");
      window.location.reload();
    
    })
  }

  //Update Menu Item
  updateMenuItem(id: number){
  
    
  }



  //For Edit item
  item : any;
  OpenADrawerForEdit(id: string){
     this.item = this.AllMenuItems.find(item => item._id  === id);
    console.log('itemForEdit ====',this.item);
    
    this.openForEdit();
  } 
  visibleForEdit = false;
 openForEdit(){
  this.visibleForEdit = true;
  }
  closeForEdit(){
    this.visibleForEdit = false;
  }
  



}
