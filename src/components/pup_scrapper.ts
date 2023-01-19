import puppeteer from "puppeteer-extra";
import { Page, Browser, executablePath } from "puppeteer"

import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin())

export class PuppeteerInitializer {

    protected $page: Page | null
    private _browser: Browser | null

    constructor() {
        this.$page = null
        this._browser = null

    }

    private async _setup() {
        this._browser = await puppeteer.launch({
            headless: true,
            executablePath: executablePath()
        })

        this.$page = await this._browser.newPage()
        if (this.$page) await this.$page.setViewport({
            height: 1200,
            width: 1200
        })
    }

    private async _cleanup() {
        if (this.$page && this._browser) {
            await this.$page.close()
            this.$page = null
            await this._browser.close()
            this._browser = null
        }

    }

    protected async $restart() {
        await this._cleanup()
        await this._setup()
    }
    protected async $extract() { }

    public async exec() {
        await this._setup()
        await this.$extract()
        await this._cleanup()

    }
}