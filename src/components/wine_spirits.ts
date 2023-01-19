import fs from "node:fs";
import Hero_Scrapper from "./scrapper.js";

import Sleep from "../misc/sleep.js";

export default class Wine_Spirits extends Hero_Scrapper {
    public static source = "https://shopredspirits.com/shop?category=all_spirits&category=all_exclud_sale_newarrivals&title=Explore"

    public static payload: Set<string> = new Set()


    protected async $extract(): Promise<void> {
        await this.$bypass('https://shopredspirits.com/')
        /*  await this.$client!.goto(Wine_Spirits.source,
             { timeoutMs: 0 })
         await this.$client!.waitForLoad('AllContentLoaded')
         await Sleep.For(2)
         fs.writeFileSync('t.jpeg', await this.$client!.takeScreenshot()) */
        let nextPage: boolean = true
        let numberOfElements = 0

        /*      while (nextPage) {
                 numberOfElements + 18
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
     
                         numberOfElements = numberOfElements + 18
     
                         await this.$client!.goto(`https://shopredspirits.com/shop?category=all_spirits&category=all_exclud_sale_newarrivals&title=Explore&skip=${numberOfElements}`
                             , { timeoutMs: 0 })
     
                         await this.$client!.waitForLoad('AllContentLoaded')
     
                     }
                 } catch (error) {
                     numberOfElements = numberOfElements - 18
                 }
     
     
             } */

        let linksfe = [
            'https://shopredspirits.com/shop?product-id=58585da739e21c3fb6d1289a&option-id=79afca4247d8f358889da55ab8cb72919b31983cb9a2767f8a75823e352f9eee',
        ]
        for (var i = 0; i < linksfe.length; i++) {
            await this.$client!.goto(linksfe[i], { timeoutMs: 0 })
            await this.$client!.waitForLoad("AllContentLoaded")
            await Sleep.For(3)
            await this.$client!.click(this.$client!.document.querySelector('button.age-check-yes'))
            await Sleep.For(3)
            /*  await this.$client!.scrollTo(this.$client!.document.querySelector('div.row.data-holder')!) */

            fs.writeFileSync(`tt_${i}.jpeg`, await this.$client!.takeScreenshot())
            let name = await this.$client!.document.querySelector('h1.name').innerText
            console.log(name)
            /*  let size = await this.$client!.document.querySelector('#product-element > ch-elements.product.page > div > div.ch-white-background > div.row.top-section > div.half.right-section > div:nth-child(1) > div.row.discount-price-container > ch-product-price-discount > div > div.product-price-discount-size-label.ch-primary-alt-color').innerText
             console.log(size)
 
             let price = await this.$client!.document.querySelector('#product-element > ch-elements.product.page > div > div.ch-white-background > div.row.top-section > div.half.right-section > div:nth-child(1) > div.row.discount-price-container > ch-product-price-discount > div > div.product-price-discount-with').innerText
             console.log(price)
 
             let prodcuctdet = await this.$client!.document.querySelector('#data-holder').innerText
             console.log(prodcuctdet) */
            let size = await this.$client!.xpathSelector('/html/body/main/div/div/article/ch-elements.product.page/div/div[1]/div[3]/div[2]/div[1]/div[1]/ch-product-price-discount/div/div[1]/span').innerText
            console.log(size)
        }

    }
}
