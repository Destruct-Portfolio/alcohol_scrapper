import fs from "node:fs";
import Hero_Scrapper from "./scrapper.js";


export default class Wine_Spirits extends Hero_Scrapper {
    public static source = "https://shopredspirits.com/shop?product-id=591311265b7cef6c8d1ad896&option-id=c6611dcdc14ef8d17ac244b36bf986eb134cbcb9ff54391b0f04f7b8dcf7b892"

    protected async $extract(): Promise<void> {
        await this.$client!.goto(Wine_Spirits.source,
            { timeoutMs: 0 })
        await this.$client!.waitForLoad('AllContentLoaded')

        fs.writeFileSync('T.jpeg', await this.$client!.takeScreenshot())

    }
}


