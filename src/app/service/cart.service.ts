import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

    protected cartProductIndexes: Array<any> = [];
    protected cartProductQuantities: Array<any> = [];
    
    public addCartProductIndexes(index, qty) {
        let check = this.cartProductIndexes.indexOf(index);

        if (check > -1) {
            this.cartProductQuantities[check] += qty;
        }
        else {
            this.cartProductIndexes.push(index);
            this.cartProductQuantities.push(qty);
        }

        console.log(this.cartProductIndexes);
        console.log(this.cartProductQuantities);

    }

    public getCartProductIndexes() {
        return this.cartProductIndexes;
    }

    public getCartProductQuantities() {
        return this.cartProductQuantities;
    }

}