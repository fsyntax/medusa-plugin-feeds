import {
  TransactionBaseService,
  ProductService,
  Product as MedusaProduct,
  ProductVariantService,
  ProductVariant,
} from '@medusajs/medusa';
import { Product as FeedProduct, FeedBuilder } from 'node-product-catalog-feed';

class FeedService extends TransactionBaseService {
  private productService: ProductService;
  private productVariantService: ProductVariantService;
  private readonly pathToProduct: string;

  constructor(container, options) {
    super(container);
    this.productService = container.productService;
    this.productVariantService = container.productVariantService;
    this.pathToProduct = options.pathToProduct ?? 'http://localhost:3000/shop/';
  }

  async createFeed() {
    const products: MedusaProduct[] = await this.productService.list({});
    const feedProducts = [];

    for (const parentProduct of products) {
      const variants: ProductVariant[] =
        await this.productService.retrieveVariants(parentProduct.id);

      if (variants && variants.length > 0) {
        const parentFeedProduct = new FeedProduct();
        parentFeedProduct.id = parentProduct.id;
        parentFeedProduct.title = parentProduct.title;
        parentFeedProduct.description = parentProduct.description;
        parentFeedProduct.link = `${this.pathToProduct}${parentProduct.handle}`;
        parentFeedProduct.imageLink = parentProduct.thumbnail;
        parentFeedProduct.condition = 'new';

        feedProducts.push(parentFeedProduct);

        for (const variant of variants) {
          console.log(variant);
          const variantFeedProduct = new FeedProduct();
          variantFeedProduct.id = variant.id;
          variantFeedProduct.title = variant.title;
          variantFeedProduct.description = parentFeedProduct.description;
          variantFeedProduct.link = `${this.pathToProduct}${parentProduct.handle}`;
          variantFeedProduct.condition = parentFeedProduct.condition;
          variantFeedProduct.availability = variant.allow_backorder
            ? variant.inventory_quantity > 0
              ? 'in_stock'
              : 'backorder'
            : variant.inventory_quantity > 0
            ? 'in_stock'
            : 'out_of_stock';
          variantFeedProduct.itemGroupId = parentFeedProduct.id;
          feedProducts.push(variantFeedProduct);
        }
      }
    }

    console.log(feedProducts);
    // 5. Create a new FeedBuilder and populate it with feed products.
    const feedBuilder = new FeedBuilder()
      .withTitle('Your Product Feed Title')
      .withLink('https://your-link.com')
      .withDescription('Your Feed Description');

    // 6. Add each feed product to the feed builder.
    feedProducts.forEach((product) => {
      feedBuilder.withProduct(product);
    });

    // 7. Build XML.
    return feedBuilder.buildXml();
  }
}

export default FeedService;
