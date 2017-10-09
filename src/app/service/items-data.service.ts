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
    private slidesImages: Array<any> = [];

    constructor(private _http: Http) {}

    public getItemsData() {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return new Observable(observer => {
            if (this.itemsData) {
                observer.next(this.itemsData);
                return observer.complete();
            }
            this._http
                .get(this.itemsDataUrl, { headers })
                .map((response: Response) => response.json())
                .subscribe(
                    (res) => {
                        // console.log(res);
                        this.itemsData = res;
                        observer.next(this.itemsData);
                        return observer.complete();
                    },
                    (error) => {
                        console.log(error);
                    });
        })
    }

    public getSlidesImages(itemsData) {
        if (this.slidesImages.length === 0) {
            return this.getAllImageItems(itemsData);
        }

        return this.slidesImages;
    }

    private getAllImageItems(itemsData) {
        let allImages = [];
        let i = 0;
        
        for (let item in itemsData) {
            let subcategories = itemsData[item].subcategories;

            for (let subcategorie in subcategories) {
                let items = subcategories[subcategorie].items;

                for (let item in items) {
                    items[item].id = i;
                    allImages.push(items[item]);
                    
                    i++;
                }
            }
        }

        this.slidesImages = allImages;

        return this.slidesImages;
    }


}