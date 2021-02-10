import {Product} from '../entity/Product';
import {define} from 'typeorm-seeding';

define(Product, () => {
  const product = new Product();
  const title = 'Harry Potter and the Cursed Child';
  const desc =
    'Harry Potter and the Cursed Child is a 2016 British two-part play written by Jack Thorne based on an original story by J. K. Rowling, John Tiffany, and Thorne. Previews of the play began at the Palace Theatre, London, on 7 June 2016, and it premiered on 30 July 2016.';
  const price = 10;
  product.title = title;
  product.desc = desc;
  product.price = price;
  return product;
});
