import { expect, Locator, Page } from "@playwright/test";
import { UserRegistrationData } from "../types/UserRegistrationData";
import {Spinner} from "../common-elements/Spinner";

export class LoginPage {

    private path: string = '/login';
    private title: string = 'MERN Store';

    private mainBlock: Locator = this.page.getByRole('main');

    private emailAddressField: Locator = this.mainBlock.getByRole('textbox', { name: 'Please Enter Your Email' });
    private passwordField: Locator = this.mainBlock.getByRole('textbox', { name: 'Please Enter Your Password' });
    private signUpButton: Locator = this.mainBlock.getByRole('button', { name: 'Login' });

    constructor(public page: Page) {}

    async open() {
        await this.page.goto(this.path);
    }

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