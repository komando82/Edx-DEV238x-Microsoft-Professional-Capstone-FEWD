import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

    public getProductFromImagesArray(imagesArray, id) {
        return imagesArray[id];
    }

}