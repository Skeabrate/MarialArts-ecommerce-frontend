import type { Action, Product, State } from './types';

const getTotalPrice = (products: Product[]) => {
  let sum = 0;

  products.forEach((product) => {
    let productSum = product.price * product.quantity;
    sum += productSum;
  });

  return sum;
};

const getCartQuantity = (products: Product[]) => products.reduce((a, b) => a + b.quantity, 0);

export const cartReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'addProduct': {
      const products = [...state.products];
      const newProduct = action.payload;
      const isTheNewProductInCart = products.find((product) => product.id === newProduct.id);
      const newProducts = [newProduct, ...products];

      const totalPrice = getTotalPrice(newProducts);
      const quantity = getCartQuantity(newProducts);

      const newState = (newProducts: Product[]) => ({
        ...state,
        products: newProducts,
        totalPrice,
        quantity,
      });

      if (!isTheNewProductInCart) {
        return newState(newProducts);
      } else {
        const newProducts = products.map((product) => {
          if (product.id === newProduct.id) {
            return { ...product, quantity: product.quantity + 1 };
          } else return { ...product };
        });

        return newState(newProducts);
      }
    }
    case 'deleteProduct': {
      const products = [...state.products];
      const productToDelete = action.payload;

      const newProducts = products.filter((product) => product.id !== productToDelete.id);

      const totalPrice = getTotalPrice(newProducts);

      return {
        ...state,
        products: newProducts,
        totalPrice,
      };
    }

    case 'openMenu': {
      return {
        ...state,
        isOpen: true,
      };
    }
    case 'closeMenu': {
      return {
        ...state,
        isOpen: false,
      };
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};
