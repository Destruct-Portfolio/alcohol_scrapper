import Sleep from "../misc/sleep.js";
import { PuppeteerInitializer } from "./pup_scrapper.js";
import { getRedemptionHeader } from "privacy-pass-redeemer"
import PrivacyPassToken from '../misc/token.js'
import fs from "node:fs"
import { url } from "node:inspector";


export default class pupp_wine extends PuppeteerInitializer {
    constructor() {
        super()
    }
    /*  private async bypass(url: string) {
         let token = PrivacyPassToken.getToken()
         console.log(token)
         console.log("[+] Attempting To bypass captcha ....");
         await this.$page!.goto(url);
         await this.$page!.evaluate((url, token) => {
             fetch(url, {
                 method: 'GET',
                 headers: token
             })
         }, url, token)
     }
  */

    protected async $extract(): Promise<void> {
        if (!this.$page) return;
        await this.$page.goto("https://shopredspirits.com/", { timeout: 0, waitUntil: 'networkidle2' })
        await this.$page.waitForTimeout(2000)
        fs.writeFileSync('htht.jpeg', await this.$page.screenshot())

        const token = PrivacyPassToken.getToken()
        /* const { proof, tokens } = await redeemer.redeem(tokens); */
        let url = "https://shopredspirits.com/"

        await this.$page.evaluate((token, url, getRedemptionHeader) => {
            fetch(url, {
                headers: getRedemptionHeader(token, url, 'GET')
            })
        }, token, url, getRedemptionHeader)

    }
}

