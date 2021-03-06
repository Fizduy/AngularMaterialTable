import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Document {
  id: string,
  author? : {
    account: string,
    fio: string,
    post: string
  },
  docCode: string,
  docDate: string,
  docName: string,
  docType: string,
  address: string,
  status: string,
  isSpecial: true | false
}

export const DocType = {
  'request': 'Запрос',
  'certificate': 'Сертификат'
}

export const DocStatus = {
  'registred': 'Зарегистрирован',
  'accepted': 'Принят'
}

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  constructor(private _httpClient: HttpClient) {}

  getTableData(): Observable<Document[]> {
    const requestUrl = '/test-data.json';

    return this._httpClient.get<Document[]>(requestUrl);
  }
}