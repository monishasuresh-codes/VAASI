import './Bookdetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import Bookdata from '../data/Bookdata';
import Bookdetail from '../data/Bookdetail';
import CartContext from '../Context/Cartcontext';
import { useContext } from 'react';
import Wishlistcontext from '../Context/Wishlistcontext';
import UserContext from '../Context/UserContext';

function Bookdetails() {

    const { id } = useParams();

    const book = Bookdata.find((book) => book.id === Number(id));

    const details = Bookdetail[id];
    const navigate = useNavigate()
    const [, addTocart] = useContext(CartContext);
    const [, addTowishlist] = useContext(Wishlistcontext);
    const { requireLogin } = useContext(UserContext)

    return (
        <div className="book-details-page">

            <div className="book-details-top">


                <div className="book-cover-section">
                    <img
                        src={book.bookcover}
                        alt={book.booktitle}
                    />
                </div>

                <div className="book-details-info">

                    <h1>{book.booktitle}</h1>

                    <p className="details-author">
                        By {book.author}
                    </p>

                    <p className="details-rating">
                        ★ {book.rating}
                    </p>

                    <p className="details-genre">
                        {book.genre}
                    </p>

                    <p className="details-price">
                        {book.price}
                    </p>

                    <div className="book-actions">

                        <button onClick={() => {
                            if (requireLogin()) {
                                addTowishlist(book)
                            }
                        }}>
                            ♡ Wishlist
                        </button>

                        <button onClick={() => {
                            if (requireLogin()) {
                                addTocart(book)
                            }
                        }}>
                            Add to Cart
                        </button>

                        <button>Buy Now</button>

                    </div>

                </div>

            </div>


            <div className="book-description">

                <h2>About the Book</h2>

                <p>{details.description}</p>

            </div>


            <div className="book-information">

                <h2>Book Information</h2>

                <div className="information-list">

                    <p>
                        <span>Pages</span>
                        {details.pages}
                    </p>

                    <p>
                        <span>Published</span>
                        {details.publishedYear}
                    </p>

                    <p>
                        <span>Language</span>
                        {details.language}
                    </p>

                    <p>
                        <span>Publisher</span>
                        {details.publisher}
                    </p>

                </div>

            </div>
            <div className="book-details-bottom">
                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                >
                    Back to Books
                </button>
            </div>

        </div>
    );
}

export default Bookdetails;