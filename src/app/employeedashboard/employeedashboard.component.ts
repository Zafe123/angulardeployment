import { Component, ViewChild, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { EmpAddEditComponent } from '../../app/emp-add-edit/emp-add-edit.component';
import { EmployeeService } from '../../app/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.scss']
})
export class EmployeedashboardComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;




  private _mobileQueryListener: () => void;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'salary',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private http: HttpClient
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  userFullName: string = '';

  ngOnInit(): void {
    this.getEmployeeList();

    const userId = localStorage.getItem('userId');
    const usersUrl = 'http://localhost:3000/signupUsers';

    this.http.get<any[]>(usersUrl).subscribe(users => {
      const currentUser = users.find(user => user.id === Number(userId));
      if (currentUser) {
        this.userFullName = currentUser.fullname;
      }
    });
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: console.log
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  tinyAlert() {
    Swal.fire('Hey there!');
  }
  successNotification() {
    Swal.fire('Hi', 'We have been informed!', 'success');
  }

  deleteEmployee(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this._empService.deleteEmployee(id).subscribe({
          next: (res) => {
            this.getEmployeeList();
          },
          error: console.log
        })
        Swal.fire('Removed!', 'Employee removed successfully.', 'success');
      }
    });
  }



}
