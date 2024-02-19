import { testWithoutLoggedUser } from "../framework/fixtures/not-logged-user-fixture";
import { SellerRegistrationData } from "../framework/types/SellerRegistrationData";

const sellerData: SellerRegistrationData = {
    name: 'Peter Griffin',
    email: `test+${Date.now()}@test.com`,
    phone: '0661234567',
    brand: 'airSlate',
    business: 'MyBusiness'
}

testWithoutLoggedUser('Store seller registration using valid credentials', async ({ pageProvider }) => {
    await pageProvider.becomeSellerPage.open();
    await pageProvider.becomeSellerPage.assertPageOpened();
    await pageProvider.becomeSellerPage.sellerRegistration(sellerData);
})
