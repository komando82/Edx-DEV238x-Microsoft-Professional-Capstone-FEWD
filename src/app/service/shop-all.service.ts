import { Injectable } from '@angular/core';

@Injectable()
export class ShopAllService {

    private categoriesData: any[] = [];
    private allSubcategoryImagesNum: number = 0;

    public getCategoriesData(itemsData) {
        if (this.categoriesData.length === 0) {
            return this.collectCategoriesData(itemsData);
        }

        return this.categoriesData;
    }

    public getSubcategoryImagesData(imagesData, subcategory, inStock = false, sort = 0) {
        let allSubcategoryImages = [];
        this.allSubcategoryImagesNum = 0;

        for (let imageIndex in imagesData) {
            if (imagesData[imageIndex].subcategory === subcategory) {
                if (inStock) {
                    if (parseInt(imagesData[imageIndex].stock, 10) > 0) {
                        allSubcategoryImages.push(imagesData[imageIndex]);
                    }
                } else {
                    allSubcategoryImages.push(imagesData[imageIndex]);
                }

                this.allSubcategoryImagesNum++;
            }
        }

        if (sort === 0) {
            return allSubcategoryImages;
        } else if (sort === 1) {
            return allSubcategoryImages.sort(this.orderByPrice);
        } else if (sort === 2) {
            return allSubcategoryImages.sort(this.orderByAlphabetical);
        } else if (sort === 3) {
            return allSubcategoryImages.sort(this.orderByRating);
        }

    }

    public getAllSubcategoryImagesNum() {
        return this.allSubcategoryImagesNum;
    }

    private orderByPrice(a, b) {
        return a.price - b.price;
    }

    private orderByAlphabetical(a, b) {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();

        if (nameA < nameB) {
            return -1;
        }

        if (nameA > nameB) {
            return 1;
        }

        return 0;
    }

    private orderByRating(a, b) {
        return b.rating - a.rating;
    }

    private collectCategoriesData(itemsData) {
        let allCategories = [];

        for (let itemIndex in itemsData) {
            let subcategorieNames = [];
            let category = itemsData[itemIndex].category;
            let subcategories = itemsData[itemIndex].subcategories;

            for (let subcategorieIndex in subcategories) {
                subcategorieNames.push(subcategories[subcategorieIndex].name);
            }

            allCategories.push({
                category,
                subcategories: subcategorieNames,
                active: false
            });
        }

        this.categoriesData = allCategories;

        return this.categoriesData;
    }

}
