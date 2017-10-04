import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ItemsDataService {
    private itemsDataUrl = 'https://webmppcapstone.blob.core.windows.net/data/itemsdata.json';

    constructor(private _http: Http) {}

    public getItemsData() {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this._http.get(this.itemsDataUrl, { headers })
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error));
    }

}