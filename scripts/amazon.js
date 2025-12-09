import {cart} from '../data/cart.js';


//This is used to accumulate (combine) HTML strings for each product during the loop that follows. Starting with an empty string allows you to append HTML content for each product using concatenation (e.g., productsHTML += productHTML;), building a complete HTML block that can later be inserted into the DOM or used elsewhere in the code. Without initializing it, you'd get an undefined reference error on the first append operation.
let productsHTML = '';



//loop througth products array
products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
           ${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
           
          data-product-id ="${product.id}">
            Add to Cart
          </button>
        </div>`;
});
// console.log(productsHTML);

// insert productsHTML into the DOM
document.querySelector('.js-products-grid').
  innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      // console.log('Added product');
      const productId = button.dataset.productId;

      let matchingItem;
      //loop through cart array to check if the product is already in the cart.
      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
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
      // calculating total quantity of items in the cart
      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

      //  console.log(cartQuantity);
      //  console.log(cart);
    })
  })


