import { testWithoutLoggedUser } from "../framework/fixtures/not-logged-user-fixture";
import { UserRegistrationData } from "../framework/types/UserRegistrationData";

const userData: UserRegistrationData = {
  email: `test+${Date.now()}@test.com`,
  firstName: 'Jason',
  lastName: 'Statham',
  password: process.env.DEFAULT_PASSWORD
}

testWithoutLoggedUser('User registration using valid credentials', async ({ pageProvider }) => {
  await pageProvider.registrationPage.open();
  await pageProvider.registrationPage.assertPageOpened();
  await pageProvider.registrationPage.userRegistration(userData);

  await pageProvider.dashboardPage.assertPageOpened();
  await pageProvider.dashboardPage.checkAccountDetails(userData);
})



