import "./Wishlistcard.css";

function Wishlistcard({ book , removeFromwishlist}) {

    return (
        <div className="wishlist-card">

            <img
                src={book.bookcover}
                alt={book.booktitle}
            />

            <h3>{book.booktitle}</h3>

            <p>{book.author}</p>

            <p>⭐ {book.rating}</p>

            <p>{book.price}</p>

            <button onClick={()=>removeFromwishlist(book.id)}>
                Remove from Wishlist
            </button>

        </div>
    );
}

export default Wishlistcard;