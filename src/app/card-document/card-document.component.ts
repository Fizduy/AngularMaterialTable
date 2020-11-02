import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Document, DocType, DocStatus, } from '../table-data.service';

@Component({
  selector: 'app-card-document',
  templateUrl: './card-document.component.html',
  styleUrls: ['./card-document.component.css']
})

export class CardDocumentComponent {

  docType = DocType;
  docStatus = DocStatus;
  date = new FormControl();
  address = new FormControl();

  constructor(@Inject(MAT_DIALOG_DATA) public data: Document) {
    this.date.setValue(data.docDate);
    this.address.setValue(data.address);
    this.date.valueChanges.subscribe(value => this.data.docDate = value);
    this.address.valueChanges.subscribe(value => this.data.address = value);
  }

}
