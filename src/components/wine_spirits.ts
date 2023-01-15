import fs, { link } from "node:fs";
import Hero_Scrapper from "./scrapper.js";

import Sleep from "../misc/sleep.js";

export default class Wine_Spirits extends Hero_Scrapper {
    public static source = "https://shopredspirits.com/shop?category=all_spirits&category=all_exclud_sale_newarrivals&title=Explore"

    public static payload: Set<string> = new Set()

    protected async $extract(): Promise<void> {
        await this.$bypass("https://shopredspirits.com/")
        await this.$client!.goto(Wine_Spirits.source,
            { timeoutMs: 0 })
        await this.$client!.waitForLoad('AllContentLoaded')
        await Sleep.For(2)
        fs.writeFileSync('T.jpeg', await this.$client!.takeScreenshot())
        let nextPage = true
        let numberOfItems = 0
        while (nextPage) {
            try {
                console.log(await this.$client!.url)
                let Links = await this.$client!.querySelectorAll('div.item-wrapper.product').$map(async (T) => {
                    return await T.querySelector('a').href
                })
                console.log(Links)
                if (Links.length === 0) {
                    nextPage = false
                } else {
                    Links.map((link: string) => {
                        this.$payload.push(link)
                    })

                    numberOfItems = numberOfItems + 18
                    await this.$client!.goto(`https://shopredspirits.com/shop?category=all_spirits&category=all_exclud_sale_newarrivals&title=Explore&skip=${numberOfItems}`
                        , { timeoutMs: 0 })

                    await this.$client!.waitForLoad('AllContentLoaded')

                }
            } catch (error) {
                numberOfItems = numberOfItems - 18
            }
        }

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
  
          let tt = await this.$client!.document.querySelector('#data-holder > div:nth-child(1)').innerText
          console.log(tt)
   */
    }
}
