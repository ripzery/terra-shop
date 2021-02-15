import {Product} from '../entity/Product';
import {Factory, Seeder} from 'typeorm-seeding';
import {Connection} from 'typeorm';

const ProductSeed = [
  {
    id: 1,
    title: 'Harry Potter and the Cursed Child',
    desc:
      'Harry Potter and the Cursed Child is a 2016 British two-part play written by Jack Thorne based on an original story by J. K. Rowling, John Tiffany, and Thorne. Previews of the play began at the Palace Theatre, London, on 7 June 2016, and it premiered on 30 July 2016.',
    price: 10000000,
    createdAt: `${new Date()}`,
    updatedAt: `${new Date()}`,
  },
  {
    id: 2,
    title: 'Harry Potter and the Deathly Hallows',
    desc:
      "The Minister for Magic Rufus Scrimgeour addresses the wizarding media, stating that the Ministry remains strong despite Lord Voldemort gaining power and the Death Eaters committing mass killings of Muggles and infiltrating the Ministry. Meanwhile, Harry Potter, Ron Weasley, and Hermione Granger resolve to complete the mission Albus Dumbledore gave Harry by hunting down and destroying Voldemort's Horcruxes. Severus Snape informs Voldemort of Harry's impending departure from Privet Drive.",
    price: 12000000,
    createdAt: `${new Date()}`,
    updatedAt: `${new Date()}`,
  },
  {
    id: 3,
    title: 'Harry Potter and the Goblet of Fire',
    desc:
      "Harry Potter awakens from a nightmare wherein a man named Frank Bryce is killed after overhearing Lord Voldemort conspiring with Peter Pettigrew and another man. While Harry attends the Quidditch World Cup match between Ireland and Bulgaria with the Weasleys and Hermione, Death Eaters terrorise the camp, and the man who appeared in Harry's dream summons the Dark Mark.      ",
    price: 15000000,
    createdAt: `${new Date()}`,
    updatedAt: `${new Date()}`,
  },
  {
    id: 4,
    title: "Harry Potter and the Sorcerer's Stone",
    desc:
      "The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.",
    price: 20000000,
    createdAt: `${new Date()}`,
    updatedAt: `${new Date()}`,
  },
];

export default class CreateProducts implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(ProductSeed)
      .execute();
  }
}
