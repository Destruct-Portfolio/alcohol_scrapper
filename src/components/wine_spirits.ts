import fs, { stat } from "node:fs";
import Hero_Scrapper from "./scrapper.js";
import { getRedemptionHeader } from "privacy-pass-redeemer"
import PrivacyPassToken from '../misc/token.js'
import Sleep from "../misc/sleep.js";

export default class Wine_Spirits extends Hero_Scrapper {
    public static source = "https://shopredspirits.com/shop?category=all_spirits&category=all_exclud_sale_newarrivals&title=Explore"

    public static payload: Set<string> = new Set()
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
        let nextPage: boolean = true
        let numberOfElements = 0
        let state = {
            numberOfElements: 0
        }
        while (nextPage) {
            state.numberOfElements + 18
            console.log(state.numberOfElements)
            try {
                console.log(`[-] Page >> ${await this.$client!.url} `)

                let Links = await this.$client!.querySelectorAll('div.item-wrapper.product').$map(async (T) => {
                    return await T.querySelector('a').href
                })
                console.log(Links)
                // pushes each Link to the new Set
                if (Links.length === 0) {
                    nextPage = false
                    break
                }
                Links.map((Link) => {
                    this.$payload.push(Link)
                })

                await this.$client!.goto
                    (`https://shopredspirits.com/shop?category=all_spirits&category=all_exclud_sale_newarrivals&title=Explore&skip=${state.numberOfElements}`
                        , { timeoutMs: 0 }
                    )
                await this.$client!.waitForLoad('AllContentLoaded')

            } catch (error) {
                console.log('From The Error ')
                console.log(error)
                numberOfElements - 18
            }


        }
        /*   while (nextPage) {
              let Links = await this.$client!.querySelectorAll('div.item-wrapper.product').$map(async (T) => {
                  return await T.querySelector('a').href
              })
              console.log(Links)
  
          }
          fs.writeFileSync('T.jpeg', await this.$client!.takeScreenshot())
   */

        /*   await this.$client!.goto(Links[0], { timeoutMs: 0 })
          await this.$client!.waitForLoad('AllContentLoaded')
          fs.writeFileSync('T2.jpeg', await this.$client!.takeScreenshot())
          let name = await this.$client!.document.querySelector('h1.name').innerText
          console.log(name)
          let sizeBox = this.$client!.document.querySelector('div.row.discount-price-container')
          let size = await sizeBox.querySelectorAll('span')[0].innerText
          console.log(size)
          let price = await sizeBox.querySelectorAll('span')[1].innerText
          console.log(price)
          let t = await this.$client!.xpathSelector('//*[@id="data-holder"]/div[1]/div/span/span/a').innerText
          console.log(t) */

    }
}
