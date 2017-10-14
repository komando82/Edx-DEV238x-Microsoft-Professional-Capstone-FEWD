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

    public removeProductFromCart(productIndex) {
        console.log(this.cartProductIndexes);

        let check = this.cartProductIndexes.indexOf(productIndex);
        console.log(check);

        if (check > -1) {
            let test1 = this.cartProductIndexes.splice(check,1);
            // console.log('A ' + test1);
            this.cartProductQuantities.splice(productIndex,1);
        }

        console.log(this.cartProductIndexes);
    }

    public setQty() {
        console.log('A');
    }

}