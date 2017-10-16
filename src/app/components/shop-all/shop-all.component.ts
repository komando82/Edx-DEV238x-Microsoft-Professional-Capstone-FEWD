import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { ItemsDataService } from '../../service/items-data.service';
import { ShopAllService } from '../../service/shop-all.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'shop-all',
  styleUrls: ['./shop-all.component.scss'],
  templateUrl: './shop-all.component.html'
})
export class ShopAllComponent implements OnInit {

  public categoriesData: any[] = [];
  public activeSubcategory: string = 'Baby Care';
  public subcategoryImages: any[] = [];
  public inStockOnly: boolean = false;
  public sortByValue: number = 0;
  public allSubcategoryImagesNum: number = 0;

  protected imagesData: any[];

  constructor(
    private _itemsDataService: ItemsDataService,
    private _shopAllService: ShopAllService,
    private _cartService: CartService
  ) {}

  public ngOnInit() {
    this._itemsDataService.getItemsData()
        .subscribe((itemsData) => {
            this.categoriesData = this._shopAllService.getCategoriesData(itemsData);
            this.imagesData = this._itemsDataService.getImagesData(itemsData);

            this.subcategoryImages = this._shopAllService.getSubcategoryImagesData(
              this.imagesData,
              this.subcategoryCannedFoodCheck(this.activeSubcategory),
              this.inStockOnly,
              this.sortByValue
            );
            this.allSubcategoryImagesNum = this._shopAllService.getAllSubcategoryImagesNum();
        });
  }

  public categoryClick(event, i) {
    this.categoriesData[i].active = !this.categoriesData[i].active;
  }

  public subcategoryClick(event, subcategory) {
    this.activeSubcategory = subcategory;

    this.subcategoryImages = this._shopAllService.getSubcategoryImagesData(
      this.imagesData,
      this.subcategoryCannedFoodCheck(this.activeSubcategory),
      this.inStockOnly,
      this.sortByValue
    );
    this.allSubcategoryImagesNum = this._shopAllService.getAllSubcategoryImagesNum();
  }

  public addToCartClick(event, id) {
    this._cartService.addCartProductIndexes(id, 1);
  }

  public inStockOnlyClick(event) {
    this.inStockOnly = !this.inStockOnly;

    this.subcategoryImages = this._shopAllService.getSubcategoryImagesData(
      this.imagesData,
      this.subcategoryCannedFoodCheck(this.activeSubcategory),
      this.inStockOnly,
      this.sortByValue
    );
    this.allSubcategoryImagesNum = this._shopAllService.getAllSubcategoryImagesNum();
  }

  public onChangeSortSelect(selectValue) {
    this.sortByValue = parseInt(selectValue, 10);

    this.subcategoryImages = this._shopAllService.getSubcategoryImagesData(
      this.imagesData,
      this.subcategoryCannedFoodCheck(this.activeSubcategory),
      this.inStockOnly,
      this.sortByValue
    );
    this.allSubcategoryImagesNum = this._shopAllService.getAllSubcategoryImagesNum();
  }

  protected subcategoryCannedFoodCheck(subcategory) {
    if (subcategory === 'Baby Care') {
      return 'Baby care';
    }
    if (subcategory === 'Canned Food') {
      return 'Canned Goods';
    }
    if (subcategory === 'Bread and Bakery') {
      return 'Bread and Bakerye';
    }

    return subcategory;
  }

}
