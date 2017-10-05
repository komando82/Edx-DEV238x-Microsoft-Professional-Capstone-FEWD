import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ItemsDataService {

    private itemsDataUrl: string = 'https://webmppcapstone.blob.core.windows.net/data/itemsdata.json';
    private itemsData: any;
    private allImages: any;

    constructor(private _http: Http) {
        this.getItemsData();
    }

    public getItemsData() {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this._http.get(this.itemsDataUrl, { headers })
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error))
            .subscribe(
                (res) => {
                    console.log(res);
                    this.itemsData = res;
                    //this.allImages = this.collectAllImages(res);
                },
                (error) => {
                    console.log(error);
                })
            ;
    }

    public getAllImages() {
        //if (this.checkIsDataNotEmpty(this.allImages)) {
            return this.collectAllImages(this.itemsData);
        //}

        //return [];
    }

    private collectAllImages(itemsData) {
        let allImages = [];

        for (let item in itemsData) {
            let subcategories = itemsData[item].subcategories;

            for (let subcategorie in subcategories) {
                let items = subcategories[subcategorie].items;

                for (let item in items) {
                    allImages.push(items[item].imagelink);
                }
            }
        }

        return allImages;
    }

    private checkIsDataNotEmpty(data) {
        if (data === undefined) {
            return false;
        }

        return true;
    }

}