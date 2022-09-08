export const LOWEST_PRICE = 'lowest';
export const HIGHEST_PRICE = 'highest';

export const findLowestOrHighestPrice = (data: any, option: string) => {
  let finalPrice = {
    price: data[0].sale || data[0].price,
    size: data[0].size,
    sale: false,
  };

  data.forEach(({ price, size, sale }: any) => {
    if (sale) finalPrice.sale = true;
    if (option === LOWEST_PRICE) {
      if (sale && sale < finalPrice.price) {
        finalPrice.price = sale;
        finalPrice.size = size;
      } else if (price < finalPrice.price) {
        finalPrice.price = price;
        finalPrice.size = size;
      }
    } else if (option === HIGHEST_PRICE) {
      if (sale && sale >= finalPrice.price) {
        finalPrice.price = sale;
        finalPrice.size = size;
      } else if (price > finalPrice.price) {
        finalPrice.price = price;
        finalPrice.size = size;
      }
    }
  });

  return finalPrice;
};
