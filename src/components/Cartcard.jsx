import './Cartcard.css';

function Cartcard({ book, removeFromCart,increase,decrease }) {



    return (
        <div className="cart-card">

            <div className="cart-cover">
                <img
                    src={book.bookcover}
                    alt={book.booktitle}
                />
            </div>

            <div className="cart-book-info">

                <h2>{book.booktitle}</h2>

                <p className="cart-author">
                    {book.author}
                </p>

                <p className="cart-rating">
                    ★ {book.rating}
                </p>

                <div className="cart-bottom">

                    <span className="cart-price">
                        {book.price}
                    </span>

                    <div className="quantity-box">

                            <button
                                className="quantity-btn"
                                onClick={() => decrease(book.id)}
                            >
                                −
                            </button>

                            <span className="quantity-number">
                                {book.quantity}
                            </span>

                            <button
                                className="quantity-btn"
                                onClick={() => increase(book.id)}
                            >
                                +
                            </button>

                        </div>

                    <button
                        className="remove-btn"
                        onClick={() => removeFromCart(book.id)}
                    >
                        Remove
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Cartcard;