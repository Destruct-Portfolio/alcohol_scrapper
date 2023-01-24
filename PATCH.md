# Issue #1

https://shopredspirits.com/shop?product-id=57aa346069702d628d2e0a01&option-id=ef9db98eae7ea5163be599ea7b8a0ad20b701304c98b20a16e6f5e018fc798c4
{
  name: "Gordon's London Dry Gin",
  size: '750 mL',
  price: '$13.99',
  type: '40%',
  subtype: 'Spirits',
  country: 'Gin', // <-------------- as you notice,
  state: 'United Kingdom', // <----- there is a shift
  pic: 'https://d3omj40jjfp5tk.cloudfront.net/products/6095acac25e0f524c86eead8/large.png'
}

This is the selector for the product properties table: ".product-characteristics.row.one-line"
Below are the property name/value selector with respect to every entry,
"span.name.half"
"span.property.half"

Checkout the in-browser code below,
```js
const properties = document.querySelectorAll(".product-characteristics.row.one-line")
undefined

properties
NodeList(6) [div.product-characteristics.row.one-line, div.product-characteristics.row.one-line, div.product-characteristics.row.one-line, div.product-characteristics.row.one-line, div.product-characteristics.row.one-line, div.product-characteristics.row.one-line]

let listing = {}
undefined

properties.forEach(async (prop)=>{
    listing[`${await prop.querySelector("span.name.half").innerText}`]=`${await prop.querySelector("span.property.half").innerText}`
})
undefined

listing
{Content: '40%', Type: 'Spirits', Subtype: 'Gin', Country: 'United Kingdom', Region: 'England', …}Content: "40%"Country: "United Kingdom"Region: "England"Sub Region: "London"Subtype: "Gin"Type: "Spirits", ...}
```