import {expect, Locator, Page} from "@playwright/test";
import { Toaster } from "../common-elements/Toaster";
import {Spinner} from "../common-elements/Spinner";

export class ShopPage {

    private path: string = '/shop';
    private title: string = 'MERN Store';

    private mainBlock: Locator = this.page.getByRole('main');

    private productCounter: Locator = this.mainBlock.locator('.text-center');

    constructor(public page: Page) {}

    async open() {
        await this.page.goto(this.path);
    }

    async assertPageOpened() {
        await this.page.waitForURL(process.env.BASE_URL + this.path, { waitUntil: 'domcontentloaded' })
        await expect(this.page).toHaveTitle(this.title);
        await Spinner.getInstance(this.page).assertSpinnerIsNotPresent();
        await expect(this.productCounter).not.toHaveText('0 products');
    }

    async addProductToWishlist(productName: string) {
        await this.mainBlock
            .locator('.product-list > div')
            .filter({ hasText: productName })
            .locator('label[type=\'submit\']')
            .click();
        await Toaster.getInstance(this.page).assertWishlistToasterPresent('Your Wishlist has been updated successfully!');
    }

}