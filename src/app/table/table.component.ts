import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {of as observableOf} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Document, TableDataService } from '../table-data.service';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['docDate', 'docType', 'docName', 'address'];
  data: MatTableDataSource<Document>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private exampleDatabase: TableDataService, private router: Router) {}

  ngAfterViewInit() {
    this.exampleDatabase!.getTableData()
      .pipe(
        map((data: Document[]) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.length;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe(data => {this.data = new MatTableDataSource(data); this.data.sort = this.sort;});
  }

  open(row: Document){
    this.router.navigate(['/document',{id: row.id}]);
}
}

