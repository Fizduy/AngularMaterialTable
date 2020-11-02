import {Component, ViewChild, AfterViewInit, EventEmitter, Output} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {of as observableOf} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Document, DocType, DocStatus, TableDataService } from '../table-data.service';


/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {
  
  @Output() docSelect = new EventEmitter<Document>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['docDate', 'docType', 'docName', 'address', 'status'];
  data: MatTableDataSource<Document>;

  docType = DocType;
  docStatus = DocStatus;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private exampleDatabase: TableDataService) {}

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
      .subscribe(data => {
        this.data = new MatTableDataSource(data);
        this.data.sort = this.sort;
        this.data.paginator = this.paginator;});
  }

  select(row: Document){
    this.docSelect.emit(row);
  }
}

