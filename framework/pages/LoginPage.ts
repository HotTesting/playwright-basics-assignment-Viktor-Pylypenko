import { expect, Locator } from "@playwright/test";
import { UserRegistrationData } from "../types/UserRegistrationData";
import { Spinner } from "../common-elements/Spinner";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    protected path: string = '/login';

    private emailAddressField: Locator = this.mainBlock.getByRole('textbox', { name: 'Please Enter Your Email' });
    private passwordField: Locator = this.mainBlock.getByRole('textbox', { name: 'Please Enter Your Password' });
    private signUpButton: Locator = this.mainBlock.getByRole('button', { name: 'Login' });

    async userLogin(userData: Omit<UserRegistrationData, 'lastName' | 'firstName'>) {
        await this.emailAddressField.fill(userData.email);
        await this.passwordField.fill(userData.password);
        await this.signUpButton.click();
    }

    async assertPageOpened() {
        await this.page.waitForURL(process.env.BASE_URL + this.path, { waitUntil: 'domcontentloaded' })
        await expect(this.page).toHaveTitle(this.title);
        await Spinner.getInstance(this.page).assertSpinnerIsNotPresent();
    }

}