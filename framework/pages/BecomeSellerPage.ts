import { expect, Locator } from "@playwright/test";
import { Spinner } from "../common-elements/Spinner";
import { SellerRegistrationData } from "../types/SellerRegistrationData";
import {Toaster} from "../common-elements/Toaster";
import {BasePage} from "./BasePage";

export class BecomeSellerPage extends BasePage {

    protected path: string = '/sell';

    private nameField: Locator = this.mainBlock.getByRole('textbox', { name: 'Your Full Name' });
    private emailField: Locator = this.mainBlock.getByRole('textbox', { name: 'Your Email Address' });
    private phoneNumberField: Locator = this.mainBlock.getByRole('textbox', { name: 'Your Phone Number' });
    private brandField: Locator = this.mainBlock.getByRole('textbox', { name: 'Your Business Brand' });
    private businessField: Locator = this.mainBlock.getByRole('textbox', { name: 'Please Describe Your Business' });
    private submitButton: Locator = this.mainBlock.getByRole('button', { name: 'Submit' });

    async sellerRegistration(sellerData: SellerRegistrationData) {
        await this.nameField.fill(sellerData.name);
        await this.emailField.fill(sellerData.email);
        await this.phoneNumberField.fill(sellerData.phone);
        await this.brandField.fill(sellerData.brand);
        await this.businessField.fill(sellerData.business);
        await this.submitButton.click();
        await Toaster.getInstance(this.page)
            .assertWishlistToasterPresent(`We received your request! we will reach you on your phone number ${sellerData.phone}!`);
    }

    async assertPageOpened() {
        await this.page.waitForURL(process.env.BASE_URL + this.path, { waitUntil: 'domcontentloaded' })
        await expect(this.page).toHaveTitle(this.title);
        await Spinner.getInstance(this.page).assertSpinnerIsNotPresent();
    }

}