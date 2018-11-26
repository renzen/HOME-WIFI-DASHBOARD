import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RequestOptions, Request} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { BuyAddOn } from '../model/BuyModels';
import { Availments } from '../model/Availmentsmodel';
import { PostpaidBalance } from '../model/PostpaidBalModel';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { map } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataServiceBridgeService {

  mobileNo: number;
  brand: string;
  userCode: number;
  channel: string;
 

  

constructor(private http: HttpClient, private messageService: MessageService) { }

// private _productURL = 'http://localhost:3000/Addons'; // nodeAPI

private _productURL = 'http://localhost:5000/api/AllAddOns';
private _promouctURL = 'http://localhost:5000/api/Promos';

// GetAddOns(): Observable<any> {
//     return this.http.get('http://jsonplaceholder.typicode.com/posts').pipe(map((res: Response) => res.json()));
// }

// GetAddOns(): Observable<any> {
//   return this.http.get(this._productURL).pipe(map((res: any) => res.json())); 
// }

  
GetAddOns(): Observable<any> {
        return this.http.get(this._productURL).pipe(tap(_ => this.log(`Get add ons = ${this._productURL}`)),
        catchError(this.handleError<any>('GetAddOns')));
}

GetPromos(): Observable<any> {
  return this.http.get(this._promouctURL).pipe(tap(_ => this.log(`Get add ons = ${this._promouctURL}`)),
  catchError(this.handleError<any>('GetPromos')));
}

BuyAddOns(model: BuyAddOn): Observable<any> {
  return this.http.post('http://stg-uhwws.intra.smart:5200/HomeWifiLoadAPIWS/api/RegisterPackage?mobileNo={0}&brand={1}&promoId={2}&uregChannel={3}&dpUsername={4}&dpPassword={5}&channel={6}', model)
}

GetPostpaidBalance(userId){
  return this.http.get('http://stg-uhwws.intra.smart:5200/HomeWifiLoadAPIWS/api/GetPostpaidBalance?mobileNo={1}&msaId={2}&brandType={3}&balancePage={4}&channel={5}'+ userId).pipe(
    tap(_ => this.log(`get user id = ${userId}`)),
    catchError(this.handleError<any>('GetPostpaidBalance')));
}

GetAvailments(model: Availments): Observable<any> {
  return this.http.post('http://stg-uhwws.intra.smart:5200/HomeWifiLoadAPIWS/api/GetAvailments?mobileNo={1}&brand={2}&promoType={3}&uregChannel={4}&dpUsername={5}&dpPassword={6}&topPromos={7}&allPromos={8}&channel={9}', model)
}



//Success handler
private extractData(response: Response){
  if(response.status < 200 || response.status >= 300){
  throw new Error(`Bad response status: ${response.status}`);
  }
  return response.json();
  }
  
  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('Data Service: ' + message);
  }
  
  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
    // Let the app keep running by returning an empty result.
    return of(result as T);
    };


}

}