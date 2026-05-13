const BOOK_PRICE = 8;
const DISCOUNT_VALUE = {
  1: 0,
  2: 5,
  3: 10,
  4: 20,
  5: 25,
};

const groupUniqueBooks = (books) => {
  const bookGroups = [[]];

  books.forEach((book) => {
    const targetGroup = bookGroups.find((group) => !group.includes(book));

    if (targetGroup) {
      targetGroup.push(book);
    } else {
      bookGroups.push([book]);
    }
  });

  // Optimize groups to maximize discount
  let fiveCount = bookGroups.filter((g) => g.length === 5).length;
  let threeCount = bookGroups.filter((g) => g.length === 3).length;
  const pairsToSwap = Math.min(fiveCount, threeCount);

  if (pairsToSwap > 0) {
    bookGroups.forEach((group) => {
      if (fiveCount > 0 && threeCount > 0 && group.length === 5) {
        const book = group.pop();

        const threeGroup = bookGroups.find((g) => g.length === 3);
        threeGroup.push(book);

        fiveCount--;
        threeCount--;
      }
    });
  }

  return bookGroups;
};

const calculateDiscountedPrice = (books) => {
  if (books.length === 0) return 0;
  const totalPrice = books.length * BOOK_PRICE;
  const discount = DISCOUNT_VALUE[books.length];
  return totalPrice - (totalPrice * discount) / 100;
};

/**
 *
 * @param {number[]} books
 */
export const cost = (books) => {
  const bookGroups = groupUniqueBooks(books);

  return Math.round(
    bookGroups.reduce((total, group) => {
      return total + calculateDiscountedPrice(group);
    }, 0) * 100,
  );
};
