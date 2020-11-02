import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDocumentComponent } from './card-document/card-document.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularTable';

  constructor(public cardDocument: MatDialog) {}

  docOpen(row: Document){
    this.cardDocument.open(CardDocumentComponent, {data: row} );
  }
}
