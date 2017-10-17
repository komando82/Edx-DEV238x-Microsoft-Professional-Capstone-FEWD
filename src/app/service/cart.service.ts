import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

    protected cartProductIndexes: any[] = [];
    protected cartProductQuantities: any[] = [];

    public addCartProductIndexes(index, qty) {
        let check = this.cartProductIndexes.indexOf(index);

        if (check > -1) {
            this.cartProductQuantities[check] += qty;
        } else {
            this.cartProductIndexes.push(index);
            this.cartProductQuantities.push(qty);
        }
    }

    public getCartProductIndexes() {
        return this.cartProductIndexes;
    }

    public getCartProductQuantities() {
        return this.cartProductQuantities;
    }

    public removeProductFromCart(productIndex) {
        let check = this.cartProductIndexes.indexOf(productIndex);

        if (check > -1) {
            this.cartProductIndexes.splice(check, 1);
            this.cartProductQuantities.splice(check, 1);
        }
    }

    public setQtyForProductId(productId, productQty) {
        let check = this.cartProductIndexes.indexOf(productId);
        this.cartProductQuantities[check] = productQty;
    }

    public resetCartData(productIndexes) {
        for (let i of Object.keys(productIndexes)) {
            this.removeProductFromCart(productIndexes[i].productId);
        }
    }

}
