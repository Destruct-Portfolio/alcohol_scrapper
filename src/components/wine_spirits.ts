import fs from "node:fs";
import Hero_Scrapper from "./scrapper.js";
import { getRedemptionHeader } from "privacy-pass-redeemer"
import PrivacyPassToken from '../misc/token.js'
import Sleep from "../misc/sleep.js";

export default class Wine_Spirits extends Hero_Scrapper {
    public static source = "https://shopredspirits.com/shop?category=all_spirits&category=all_exclud_sale_newarrivals&title=Explore"

    protected async bypass() {
        let token = PrivacyPassToken.getToken()
        console.log(token)
        console.log("[+] Attempting To bypass captcha ....");
        await this.$client!.goto("https://shopredspirits.com/");
        await this.$client!.fetch("https://shopredspirits.com/", {
            headers: getRedemptionHeader(token, "https://shopredspirits.com/", "GET"),
        });
    }

    protected async $extract(): Promise<void> {
        await this.bypass()
        await this.$client!.goto(Wine_Spirits.source,
            { timeoutMs: 0 })
        await this.$client!.waitForLoad('AllContentLoaded')
        await Sleep.For(2)
        fs.writeFileSync('T.jpeg', await this.$client!.takeScreenshot())
        let Links = await this.$client!.querySelectorAll('div.item-wrapper.product').$map(async (T) => {
            return await T.querySelector('a').href
        })
        console.log(Links)

        await this.$client!.goto(Links[0], { timeoutMs: 0 })
        await this.$client!.waitForLoad('AllContentLoaded')
        fs.writeFileSync('T2.jpeg', await this.$client!.takeScreenshot())
        let name = await this.$client!.document.querySelector('h1.name').innerText
        console.log(name)
        let sizeBox = this.$client!.document.querySelector('div.row.discount-price-container')
        let size = await sizeBox.querySelectorAll('span')[0].innerText
        console.log(size)
        let price = await sizeBox.querySelectorAll('span')[1].innerText
        console.log(price)

        let tt = await this.$client!.document.querySelector('#data-holder > div:nth-child(1)').innerText
        console.log(tt)

    }
}
