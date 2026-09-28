import { Link } from 'react-router-dom';
import './Bookcard.css'

function Bookcard({bookcover, booktitle, author, rating, price,genre,id}) {
    return (
        <div className="book-card">

            <img src={bookcover} alt="Book cover" />

            <div className="book-info">

                <h3>{booktitle}</h3>

                <p className="book-author">{author}</p>
                 <p className="book-genre">{genre}</p>

                <div className="book-meta">

                    <div className="book-rating">
                        <span>★</span>
                        <span>{rating}</span>
                    </div>

                    <p className="book-price">{price}</p>

                </div>

                <button><Link to={`/book/${id}`} className="view-book">
                View Book</Link></button>

            </div>

        </div>
    )
}

export default Bookcard;