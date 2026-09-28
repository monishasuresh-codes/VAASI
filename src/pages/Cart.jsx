import { useContext } from "react";
import CartContext from "../Context/Cartcontext";
import Cartcard from "../components/Cartcard";
import "./Cart.css";

function Cart() {

    const [cart, , removeFromCart,increase,decrease] = useContext(CartContext);

    const total = cart.reduce((sum, book) => {
        const price = Number(
            book.price.replace("₹", "")
        );
        const quantity = book.quantity

        return sum + price*quantity;
    }, 0);

    return (
        <div className="cart-page">

            <div className="cart-heading">
                <h1>My Cart</h1>
                <p>Your selected books</p>
            </div>

            {cart.length === 0 ? (

                <div className="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p>Discover a new story and add it to your collection.</p>
                </div>

            ) : (

                <div className="cart-content">

                    {/* Books */}

                    <div className="cart-items">

                        {cart.map((book) => (
                            <Cartcard
                                key={book.id}
                                book={book}
                                removeFromCart={removeFromCart}
                                increase={increase}
                                decrease={decrease}
                            />
                        ))}

                    </div>


                    {/* Summary */}

                    <div className="cart-summary">

                        <h2>Cart Summary</h2>

                        <div className="summary-books">

    {cart.map((book) => {

        const price = Number(
            book.price.replace("₹", "")
        );

        const subtotal = price * book.quantity;

        return (
            <div className="summary-book" key={book.id}>

                <span className="summary-book-name">
                    {book.booktitle}
                </span>

                <span className="summary-quantity">
                    × {book.quantity}
                </span>

                <span className="summary-subtotal">
                    ₹{subtotal}
                </span>

            </div>
        );
    })}

</div>

<div className="summary-line"></div>

                        <div className="summary-row total-row">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>

                        <button className="checkout-btn">
                            Proceed to Checkout
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Cart;