import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTablePaginationPosition, NzTablePaginationType, NzTableSize } from 'ng-zorro-antd/table/public-api';
import { ScheduleTimeService } from 'src/app/services/schedule-time.service';

@Component({
  selector: 'app-schedule-time-table',
  templateUrl: './schedule-time-table.component.html',
  styleUrls: ['./schedule-time-table.component.css']
})
export class ScheduleTimeTableComponent implements OnInit {

  isCollapsed = false;


  frontPagination = true;
  totalNumberOfData = 0;
  pageIndex = 1;
  pageSize = 10;
  showPagination = true;
  paginationPosition: NzTablePaginationPosition = 'bottom';
  paginationType: NzTablePaginationType = 'small';
  showBorder = true;
  outerBordered = true;
  sizeOfTable: NzTableSize = 'small';
  loadingStatus = false;
  tableTitle = 'Schedule Time Table';
  tableFooter = '';
  noResult = 'No Data Present';
  showQuickJumper = true;
  hidePaginationOnSinglePage = true;
  showDeleteButton = true;
  showEditButton = true;
  showAddButton = true;

  visible = false;
  isEdit = false;

  onAdd(): void {
    this.visible = true;
    this.isEdit = false;
    this.refreshFields();
  }

  close(): void {
    this.visible = false;
  }

  submitForm() {
    this.createUpdateScheduleTime();
    this.visible = false;
  }

  refreshFields(): void {
    this.id = '';
    this.restaurantId = 1;
    this.mealTimeName = '';
    this.startDay = '';
    this.endDay = '';
    this.description = '';
    this.startTime = '';
    this.endTime = '';
    this.mealTimeId = 0;
  }
  
  unitList = ['ml', 'gm', 'piece', 'bottle', 'packet', 'kg', 'litre', 'pound'];

  scheduleTimes: any[] = [];

  onCurrentPageDataChange(scheduleTimes: any[]): void {
    this.scheduleTimes = scheduleTimes;
  }

  id!: string;
  restaurantId!: number;
  mealTimeName!: string;
  startDay!: string;
  endDay!: string;
  description!: string;
  startTime!: string;
  endTime!: string;
  mealTimeId!: number;

  constructor(private scheduleTimeService: ScheduleTimeService, private message: NzMessageService) { }

  @Input() restaurantIdInput: number = 1;

  ngOnInit(): void {
    this.loadAllScheduleTimes();
  }

  private loadAllScheduleTimes() {
    this.scheduleTimeService.getAllScheduleTime().subscribe({
      next: (data: Object) => {
        this.scheduleTimes = (data as any[]).map((ingredient: any) => ({
          ...ingredient,
        }));
        console.log('Ingredient data loaded', this.scheduleTimes);
      },
      error: (error) => {
        console.error('Error fetching ingredient data', error);
      },
    });
  }

  createUpdateScheduleTime() {
    let newScheduleTime = {
      restaurantId: this.restaurantId,
      mealTimeName: this.mealTimeName,
      startDay: this.startDay,
      endDay: this.endDay,
      description: this.description,
      startTime: this.startTime,
      endTime: this.endTime,
      mealTimeId: this.mealTimeId,
    };

    console.log(newScheduleTime);

    if (this.isEdit) {
      this.scheduleTimeService.updateScheduleTime(this.id, newScheduleTime).subscribe((res) => {
        console.log(res);
      });
    } else {
      this.scheduleTimeService.createScheduleTime(newScheduleTime).subscribe((res) => {
        console.log(res);
      });
    }
  }

  onDelete(Id: string): void {
    this.scheduleTimeService.deleteScheduleTime(Id).subscribe({
      next: () => {
        this.scheduleTimes = this.scheduleTimes.filter(
          (scheduleTime) => scheduleTime._id !== Id
        );
        console.log(`Schedule Time with ID ${Id} deleted successfully.`);
      },
      error: (error: any) => {
        console.error(`Error deleting schedule time with ID ${Id}`, error);
      },
    });
  }

  onEdit(scheduleTime: any): void {
    this.visible = true;
    this.isEdit = true;

    this.id = scheduleTime._id;
    this.restaurantId = scheduleTime.restaurantId;
    this.mealTimeName = scheduleTime.mealTimeName;
    this.startDay = scheduleTime.startDay;
    this.endDay = scheduleTime.endDay;
    this.description = scheduleTime.description;
    this.startTime = scheduleTime.startTime;
    this.endTime = scheduleTime.endTime;
    this.mealTimeId = scheduleTime.mealTimeId;


    const editDetails={
      // restaurantId: 1,
      _id :scheduleTime._id,
      restaurantId : scheduleTime.restaurantId,
      mealTimeName : scheduleTime.mealTimeName,
      startDay : scheduleTime.startDay,
      endDay : scheduleTime.endDay,
      description : scheduleTime.description,
      startTime : scheduleTime.startTime,
      endTime : scheduleTime.endTime,
      mealTimeId : scheduleTime.mealTimeId,
    }
    console.log('categoryId=======', scheduleTime);
    console.log("edit details final=====", editDetails);


    this.scheduleTimeService.updateScheduleTime(scheduleTime._id, editDetails).subscribe(res=>{
      console.log('====subscribe Data for schedule' ,res);
      
    })
  }

}
