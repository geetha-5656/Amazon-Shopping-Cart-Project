// to access the variable cart outside of the cart.js file
export const cart =[];

// create a function to handle add to cart button 
  export function addToCart(productId){
     let matchingItem;
      //loop through cart array to check if the product is already in the cart.
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      }
      else {
        cart.push({
          productId: productId,
          quantity: 1
        });
      }
  }

