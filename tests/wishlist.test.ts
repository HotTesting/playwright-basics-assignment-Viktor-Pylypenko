import { testWithLoggedUser } from "../framework/fixtures/logged-user-fixture"

const productName: string = 'SWEET PEPPER PASTE';
const subPageHeader: string = 'Your Wishlist';

testWithLoggedUser('Add product to the wishlist', async ({ pageProvider}) => {
    await pageProvider.shopPage.open();
    await pageProvider.shopPage.assertPageOpened();
    await pageProvider.shopPage.addProductToWishlist(productName);

    await pageProvider.dashboardPage.open();
    await pageProvider.dashboardPage.assertPageOpened();
    await pageProvider.dashboardPage.openWishList();
    await pageProvider.dashboardPage.assertSubPageOpened(subPageHeader);
    await pageProvider.dashboardPage.removeProductFromWishList(productName);
})
