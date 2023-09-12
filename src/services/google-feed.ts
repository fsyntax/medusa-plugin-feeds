import {
    TransactionBaseService,
    ProductService,
    Product,
    ProductVariantService,
    ProductVariant
} from "@medusajs/medusa";

import {Product as MedusaProduct} from "@medusajs/medusa/dist/models/product";
import {XMLBuilder, XmlBuilderOptionsOptional} from "fast-xml-parser";

class GoogleFeedService extends TransactionBaseService {
    private productService: ProductService;
    private productVariantService: ProductVariantService;
    private readonly pathToProduct: string;
    private xmlBuilderOptions: XmlBuilderOptionsOptional;

    constructor(container, options) {
        super(container);
        this.productService = container.productService;
        this.productVariantService = container.productVariantService;
        this.xmlBuilderOptions = {
            ignoreAttributes: false,
            arrayNodeName: 'item'
        }

    }

    async createGoogleFeed() {

        const products: MedusaProduct[] = await this.productService.list({});

        const builder = new XMLBuilder(this.xmlBuilderOptions)

        return builder.build(products)
    }

}

export default GoogleFeedService;
