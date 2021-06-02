import { useContext } from "react";
import { useSelector } from 'react-redux';
import CheckoutStatus from '../../components/checkout-status';
import Item from './item';

import { loadStripe } from '@stripe/stripe-js'

import { API_URL, STRIPE_PK } from '../../utils/urls'

import AuthContext from "../../context/AuthContext";


const stripePromise = loadStripe(STRIPE_PK);

const ShoppingCart = () => {
  const { cartItems } = useSelector(state => state.cart);
  
  const { getToken } = useContext(AuthContext);

  const priceTotal = useSelector(state => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if(cartItems.length > 0) {
      cartItems.map(item => totalPrice += item.price * item.count);
    }
    
    return totalPrice;
  })

  function formatBody () {
    var products = [];
    cartItems.map(item => (
        products.push({ id: item.id, price: item.price, quantity:item.count })
    ));
    console.log(products);
    return products;
}

  const handleBuy = async (e) => {
    const products = formatBody();
    const stripe = await stripePromise;
    const token = await getToken();
    console.log("handleBuy token", token);
    e.preventDefault();
    const res = await fetch(`${API_URL}/orders/`, {
            method: 'POST',
            body: JSON.stringify({products}),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
    });
    const session = await res.json();
    console.log("session", session);

    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });
    }

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Shopping Cart</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cartItems.length > 0 &&
            <table>
              <tbody>
                <tr>
                  <th style={{textAlign: 'left'}}>Product</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Ammount</th>
                  <th>Price</th>
                  <th></th>
                </tr>

                {cartItems.map(item => (
                  <Item 
                    key={item.id}
                    id={item.id}
                    thumb={item.thumb}
                    name={item.name}
                    color={item.color}
                    price={item.price}
                    size={item.size}
                    count={item.count}
                  />
                ))}
              </tbody>
            </table> 
          } 
          
          {cartItems.length === 0 && 
            <p>Nothing in the cart</p>
          }
        </div>
      
        <div className="cart-actions">
          <a href="/products" className="cart__btn-back"><i className="icon-left"></i> Continue Shopping</a>
          <input type="text" placeholder="Promo Code" className="cart__promo-code" />

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">Total cost <strong>${priceTotal.toFixed(2)}</strong></p>
            { cartItems.length > 0 ?
                <button className="btn btn--rounded btn--yellow" onClick={handleBuy}>Checkout</button>
            :
                <button disabled className="btn btn--rounded btn--disabled">Checkout</button>
            }
        </div>
        </div>
      </div>
    </section>
  )
};

  
export default ShoppingCart