import { expect } from "@playwright/test";
import { UserRegistrationData } from "../types/UserRegistrationData";
import { Spinner } from "../common-elements/Spinner";
import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {

    protected path: string = '/dashboard';

    async openWishList() {
        await this.mainBlock
            .getByRole('listitem')
            .filter({ hasText: 'WishList' })
            .getByRole('link')
            .click();
    }

    async removeProductFromWishList(productName: string) {
        await this.mainBlock
            .locator('.w-list > div')
            .filter({ hasText: productName })
            .getByRole('button')
            .click();
        await expect(this.mainBlock.locator('.not-found'))
            .toContainText('You have no items in your wishlist yet.')
    }

    async assertSubPageOpened(subPageHeader: string) {
        await expect(this.mainBlock.getByRole('heading', {
            name: subPageHeader
        })).toBeVisible();

        await Spinner.getInstance(this.page).assertSpinnerIsNotPresent();
    }

    async assertPageOpened() {
        await this.page.waitForURL(process.env.BASE_URL + this.path, { waitUntil: 'domcontentloaded' })
        await expect(this.page).toHaveTitle(this.title);
        await Spinner.getInstance(this.page).assertSpinnerIsNotPresent();
    }

    async checkAccountDetails(userData: Omit<UserRegistrationData, 'password'>) {
        await expect(this.mainBlock.getByText(userData.email)).toBeVisible();
        await expect(this.mainBlock.getByPlaceholder('Please Enter Your First Name')).toHaveValue(userData.firstName);
        await expect(this.mainBlock.getByPlaceholder('Please Enter Your Last Name')).toHaveValue(userData.lastName);
    }

}