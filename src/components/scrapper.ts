import Hero from '@ulixee/hero'
import Server from '@ulixee/server'

export default class Hero_Scrapper {

    public static HERO_PORT = 6302


    protected $payload: any[]
    protected $client: Hero | null

    private _server: Server | null

    constructor() {

        this._server = null
        this.$client = null

        this.$payload = []

    }



    protected async $setup() {
        this._server = new Server()
        await this._server.listen({
            port: Hero_Scrapper.HERO_PORT
        })

        this.$client = new Hero({
            connectionToCore: {
                host: `ws://localhost:${Hero_Scrapper.HERO_PORT}`
            }
        })
    }
    protected async $extract() { }

    protected async $cleanup() {
        if (this.$client && this._server) {
            await this.$client.close()
            await this._server.close()
        }
    }

    public async exec() {
        await this.$setup()
        await this.$extract()
        await this.$cleanup()

        return this.$payload
    }
}