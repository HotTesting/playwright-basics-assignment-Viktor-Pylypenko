import { expect, Locator, Page } from "@playwright/test";
import { UserRegistrationData } from "../types/UserRegistrationData";
import { Spinner } from "../common-elements/Spinner";

export class RegistrationPage {

    private path: string = '/register';
    private title: string = 'MERN Store';

    private mainBlock: Locator = this.page.getByRole('main');

    private emailAddressField: Locator = this.mainBlock.getByRole('textbox', { name: 'Please Enter Your Email' });
    private firstNameField: Locator = this.mainBlock.getByRole('textbox', { name: 'Please Enter Your First Name' });
    private lastNameField: Locator = this.mainBlock.getByRole('textbox', { name: 'Please Enter Your Last Name' });
    private passwordField: Locator = this.mainBlock.getByRole('textbox', { name: 'Please Enter Your Password' });
    private signUpButton: Locator = this.mainBlock.getByRole('button', { name: 'Sign Up' });

    constructor(public page: Page) {}

    async userRegistration(userData: UserRegistrationData) {
        await this.emailAddressField.fill(userData.email);
        await this.firstNameField.fill(userData.firstName);
        await this.lastNameField.fill(userData.lastName);
        await this.passwordField.fill(userData.password);
        await this.signUpButton.click();
    }

    async open() {
        await this.page.goto(this.path);
    }

    async assertPageOpened() {
        await this.page.waitForURL(process.env.BASE_URL + this.path, { waitUntil: 'domcontentloaded' })
        await expect(this.page).toHaveTitle(this.title);
        await Spinner.getInstance(this.page).assertSpinnerIsNotPresent();
    }

}