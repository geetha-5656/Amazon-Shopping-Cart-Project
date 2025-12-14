// to access the variable cart outside of the cart.js file


export let cart = JSON.parse(localStorage.getItem('cart'));//get cart from local storage and convert it back to js object

//if there is no cart in the local storage or if the cart is empty, then set cart to default items.
if(!cart){
  cart =[{
  productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:2,
  deliveryOptionId:'1'
},
{
 productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
quantity:1,
deliveryOptionId:'2'
}];
};

// create a function to save cart to local storage
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));

}

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
          quantity: 1,
          deliveryOptionId:'1'
        });
      }
      saveToStorage();
  }


  //remove item from cart 

  export function removeFromCart(productId){
    const newCart =[];

    cart.forEach((cartItem)=>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
    cart = newCart;
    saveToStorage();
  }
