import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResortDataService {

  url='https://vretail-admin-backend.vtour.tech/club-mahindra/fetch-resort-data'
  constructor(private http: HttpClient) { }
  getdata(){

   return this.http.get(this.url)

  }
}
