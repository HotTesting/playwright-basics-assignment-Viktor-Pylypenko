import { Page } from "@playwright/test";

import { RegistrationPage } from "./pages/RegistrationPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ShopPage } from "./pages/ShopPage";
import { LoginPage } from "./pages/LoginPage";
import {BecomeSellerPage} from "./pages/BecomeSellerPage";

export class PageProvider {

    private static instance: PageProvider;

    private constructor(private page: Page) {}

    public static getInstance(page: Page): PageProvider {
        if (!PageProvider.instance) {
            PageProvider.instance = new PageProvider(page);
        }

        return PageProvider.instance;
    }

    public registrationPage: RegistrationPage = new RegistrationPage(this.page);
    public dashboardPage: DashboardPage = new DashboardPage(this.page);
    public shopPage: ShopPage = new ShopPage(this.page);
    public loginPage: LoginPage = new LoginPage(this.page);
    public becomeSellerPage: BecomeSellerPage = new BecomeSellerPage(this.page);

}