import { test } from "@playwright/test";
import { PageProvider } from "../PageProvider";

export const testWithoutLoggedUser = test.extend<{ pageProvider: PageProvider }>({
    pageProvider: async ({ page}, use) => {
        const provider = PageProvider.getInstance(page);
        await use(provider);
    }
});