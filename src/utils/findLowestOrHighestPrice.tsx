import { formatValue } from './formatValue';

export const findProductPrices = (productAvailableSizes: any, basicPrice: any) => {
  let finalPrice = {
    minimalPrice: productAvailableSizes[0].sale || productAvailableSizes[0].price || basicPrice,
    maximalPrice: productAvailableSizes[0].sale || productAvailableSizes[0].price || basicPrice,
    sale: productAvailableSizes[0].sale ? true : false,
  };

  for (let i = 1; i < productAvailableSizes.length; i++) {
    // find lowest price
    if (productAvailableSizes[i].sale && productAvailableSizes[i].sale < finalPrice.minimalPrice) {
      finalPrice.minimalPrice = productAvailableSizes[i].sale;
    } else if (
      productAvailableSizes[i].price &&
      productAvailableSizes[i].price < finalPrice.minimalPrice
    ) {
      finalPrice.minimalPrice = productAvailableSizes[i].price;
    } else if (basicPrice < finalPrice.minimalPrice) {
      finalPrice.minimalPrice = basicPrice;
    }

    // find highest price
    if (productAvailableSizes[i].sale && productAvailableSizes[i].sale > finalPrice.maximalPrice) {
      finalPrice.maximalPrice = productAvailableSizes[i].sale;
    } else if (
      productAvailableSizes[i].price &&
      productAvailableSizes[i].price > finalPrice.maximalPrice
    ) {
      finalPrice.maximalPrice = productAvailableSizes[i].price;
    } else if (basicPrice > finalPrice.maximalPrice) {
      finalPrice.maximalPrice = basicPrice;
    }
  }

  if (finalPrice.minimalPrice === finalPrice.maximalPrice) finalPrice.maximalPrice = null;

  return {
    minimalPrice: formatValue(finalPrice.minimalPrice),
    maximalPrice: finalPrice.maximalPrice ? formatValue(finalPrice.maximalPrice) : null,
    sale: finalPrice.sale,
  };
};
