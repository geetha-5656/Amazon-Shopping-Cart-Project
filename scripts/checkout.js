import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
// default exported from dayjs library to manage date and time.
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';




//loop through cart generate HTML for each item in the cart
let cartSummaryHTML = '';
cart.forEach((cartItem) => {

  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  // get the delivery option id from the cart item.
  const deliveryOptionId = cartItem.deliveryOptionId;

  // the delivery option selected for the cart item and find the matching delivery option.
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  // If no matching delivery option is found, use the first one as default.
  if (!deliveryOption) {
    deliveryOption = deliveryOptions[0];
  }

  const today = dayjs();
  //calculate delivery date by adding delivery days to todays date.
  const deliveryDate = today.add(
    deliveryOption.deliveryDays, 'days');

  const dateString = deliveryDate.format(
    'dddd,MMMM D'
  );

  cartSummaryHTML +=
    ` <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
           ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
         ${deliveryOptionHTML(matchingProduct, cartItem)}
         
        </div>
      </div>
    </div>`
});

function deliveryOptionHTML(matchingProduct, cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    //calculate delivery date by adding delivery days to todays date.
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days');

    const dateString = deliveryDate.format(
      'dddd,MMMM D'
    );

    const priceString = deliveryOption.priceCents === 0 ?
      'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
    <div class="delivery-option">
                  <input type="radio" ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                      
                    </div>
                  </div>
                </div>`
  });
  return html;
}

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;
console.log(cartSummaryHTML);

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      // console.log(productId);
      removeFromCart(productId);
      // console.log(cart);

      //remove the cart item from the DOM
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      console.log(container);
      container.remove();
    });
  });
