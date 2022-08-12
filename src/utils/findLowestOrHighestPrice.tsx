export const LOWEST_PRICE = 'lowest';
export const HIGHEST_PRICE = 'highest';

export const findLowestOrHighestPrice = (data: any, option: string) => {
  let finalPrice = {
    price: data[0].Promocja || data[0].Cena,
    wymiary: data[0].Wymiary,
    promocja: false,
  };

  data.forEach(({ Cena, Wymiary, Promocja }: any) => {
    if (Promocja) finalPrice.promocja = true;
    switch (option) {
      case LOWEST_PRICE:
        if (Promocja && Promocja < finalPrice.price) {
          finalPrice.price = Promocja;
          finalPrice.wymiary = Wymiary;
        } else if (Cena < finalPrice.price) {
          finalPrice.price = Cena;
          finalPrice.wymiary = Wymiary;
        }
      case HIGHEST_PRICE:
        if (Promocja && Promocja >= finalPrice.price) {
          finalPrice.price = Promocja;
          finalPrice.wymiary = Wymiary;
        } else if (Cena > finalPrice.price) {
          finalPrice.price = Cena;
          finalPrice.wymiary = Wymiary;
        }
      default:
        return finalPrice;
    }
  });

  return finalPrice;
};
