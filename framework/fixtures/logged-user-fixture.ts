import { test } from "@playwright/test";
import { PageProvider } from "../PageProvider";
import { UserRegistrationData } from "../types/UserRegistrationData";

export type AdminCredentials = {
    userData: Omit<UserRegistrationData, 'firstName' | 'lastName'>
}

export const testWithLoggedUser = test.extend< AdminCredentials & { pageProvider: PageProvider }>({
    userData: [
        {
            email: 'penix95399@fahih.com',
            password: process.env.DEFAULT_PASSWORD
        },
        {
            option: true
        }
    ],
    pageProvider: async ({ page, userData }, use) => {
        const provider = PageProvider.getInstance(page);
        await provider.loginPage.open();
        await provider.loginPage.userLogin(userData);
        await provider.dashboardPage.assertPageOpened();
        await use(provider);
    }
});