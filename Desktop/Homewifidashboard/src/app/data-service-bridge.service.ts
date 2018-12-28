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





// const httpOptions = {
//   headers: new HttpHeaders({
//       'Content-Type': 'application/json'
//   })
// };



@Injectable({
  providedIn: 'root'
})

export class DataServiceBridgeService {

  mobileNo: number;
  brand: string;
  userCode: number;
  channel: string;
 
  _token = 'RiHdHENVs9wA9G10oNj04pz56lJOblywY2o0wCjRmJO3/J2OS4uBvhFQXYjqO/cKuJbbsZrAOvyxwBI8MNcRipdbt/bVKMVWnQnStE9SfD9uNiLrfthEAKy/t4SpaTe9Qqcy5PZPKJeE/5i4Kz7//paTHDOAe/kf1OPbQHupnL3WPDUBisNFSPQwunZf7+4vfuauUko1oBmJep0GOYA00A==';
  _clientId = 13323;

  // http://10.30.31.124:4663/pldthome/api/smartbridge/CSP/DashboardService.svc/rest/InquireWallets/10247402586/1/GSM/S000000HOME/0
  // http://pldtiwsdev01:8001/PLDTServiceBridge/Modules/PLDTKenan/PLDTKenanService.svc/rest/GetAccountBalance/246779694/0
  _urlWallet ='https://myiuhwapi-staging.herokuapp.com/api/account/inquirewalletdpp';  // 'https://www.pldt.com.ph/mobility/dev/pldthome/api/smartbridge/CSP/DashboardService.svc/rest/InquireWallets/1';
  //_urlWalletEnd = '/1/GSM/S000000HOME/0';            //'/1/GSM/S000000HOME/0';

 

constructor(private http: HttpClient, private messageService: MessageService, private http1: Http) { }

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


GetPostpaidAccount(mobileNo): Observable<any> {
  return this.http.get('https://www.pldt.com.ph/mobility/dev/pldthome/api/smartbridge/PLDTKenan/PLDTKenanService.svc/rest/GetAccountBalanceByService' + mobileNo + '/0').pipe(
    tap(_ => this.log(`get user id = ${mobileNo}`)),
    catchError(this.handleError<any>('GetPostpaidBalance')));
}

GetPostpaidBalance(AccountNo): Observable<any> {

  var httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'accept': 'application/json',
    'X-Pldt-Auth-Token': `${this._token}`,
    'X-Pldt-Client-Id': `${this._clientId}`})
     }; 

  // let headers = new HttpHeaders ();
  // headers.append('X-Pldt-Auth-Token','RiHdHENVs9wA9G10oNj04pz56lJOblywY2o0wCjRmJO3/J2OS4uBvhFQXYjqO/cKuJbbsZrAOvyxwBI8MNcRipdbt/bVKMVWnQnStE9SfD9uNiLrfthEAKy/t4SpaTe9Qqcy5PZPKJeE/5i4Kz7//paTHDOAe/kf1OPbQHupnL3WPDUBisNFSPQwunZf7+4vfuauUko1oBmJep0GOYA00A== ')
  // headers.append('X-Pldt-Client-Id','13323')
  // let headers = new HttpHeaders();
  // headers = headers.set('X-Pldt-Auth-Token', 'RiHdHENVs9wA9G10oNj04pz56lJOblywY2o0wCjRmJO3/J2OS4uBvhFQXYjqO/cKuJbbsZrAOvyxwBI8MNcRipdbt/bVKMVWnQnStE9SfD9uNiLrfthEAKy/t4SpaTe9Qqcy5PZPKJeE/5i4Kz7//paTHDOAe/kf1OPbQHupnL3WPDUBisNFSPQwunZf7+4vfuauUko1oBmJep0GOYA00A== ').set('X-Pldt-Client-Id','13323');

 // console.log('Inquire Wallets Balance ' + httpOptions);
  console.log(`${this._urlWallet}` +  AccountNo);
  // return this.http.get('https://www.pldt.com.ph/mobility/dev/pldthome/api/smartbridge/CSP/DashboardService.svc/rest/InquireWallets/1' + AccountNo + '/1/GSM/S000000HOME/0',{ headers: headers }).pipe(
  //   tap(_ => this.log(`get user id = ${AccountNo}`)),
  //   catchError(this.handleError<any>('GetPostpaidBalance')));

  // const headers = new Headers({
  //   // 'Content-Type': 'application/json',
  //   'Authorization': 'RiHdHENVs9wA9G10oNj04pz56lJOblywY2o0wCjRmJO3/J2OS4uBvhFQXYjqO/cKuJbbsZrAOvyxwBI8MNcRipdbt/bVKMVWnQnStE9SfD9uNiLrfthEAKy/t4SpaTe9Qqcy5PZPKJeE/5i4Kz7//paTHDOAe/kf1OPbQHupnL3WPDUBisNFSPQwunZf7+4vfuauUko1oBmJep0GOYA00A=='
  // })

  var body = `{
    "numberFlag": "1",
    "brand": "GSM",
    "userCode": "S000000HOME",
    "channel": "0",
    "serviceNumber": "10247402586"
  }`

  return this.http.post(this._urlWallet, JSON.parse(body))


}




GetAvailments(model: Availments): Observable<any> {
  return this.http.post('http://stg-uhwws.intra.smart:5200/HomeWifiLoadAPIWS/api/GetAvailments?mobileNo={1}&brand={2}&promoType={3}&uregChannel={4}&dpUsername={5}&dpPassword={6}&topPromos={7}&allPromos={8}&channel={9}', model)
}


//add
BuyAddOns(model: BuyAddOn): Observable<any> {
  return this.http.post('http://stg-uhwws.intra.smart:5200/HomeWifiLoadAPIWS/api/RegisterPackage?mobileNo={0}&brand={1}&promoId={2}&uregChannel={3}&dpUsername={4}&dpPassword={5}&channel={6}', model)
}

// http://stg-uhwws.intra.smart:5200/HomeWifiLoadAPIWS/api/GetPostpaidBalance?mobileNo={1}&msaId={2}&brandType={3}&balancePage={4}&channel={5}

// http://pldtiwsdev01:8001/PLDTServiceBridge/Modules/PLDTKenan/PLDTKenanService.svc/rest/GetAccountBalanceByService/09987970001/0 
// http://pldtiwsdev02:8001/PLDTServiceBridge/Modules/CSP/DashboardService.svc/rest/InquireWallets/10247402586/1/GSM/S000000HOME/myHome 



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

// http://pldtiwsdev02:8001/PLDTServiceBridge/Modules/CSP/DashboardService.svc/rest/InquireWallets/10247403396/1/GSM/S000000HOME/myHome
// https://www.pldt.com.ph/mobility/dev/pldthome/api/smartbridge/PLDTKenan/PLDTKenanService.svc/rest/GetAccountBalanceByService/09987970001/0