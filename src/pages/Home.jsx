import './Home.css'

import Bookcard from '../components/Bookcard';

import hero from '../assets/hero.jpeg'


import book1 from '../assets/books/book1.jpg';
import book2 from '../assets/books/book2.jpg';
import book3 from '../assets/books/book3.jpg'
import book4 from '../assets/books/book4.jpg'
import book5 from '../assets/books/book5.jpg'
import book6 from '../assets/books/book6.jpg'
import book7 from '../assets/books/book7.jpg'
import book8 from '../assets/books/book8.jpg'

import newbook1 from '../assets/newbooks/newbook1.jpg'
import newbook2 from '../assets/newbooks/newbook2.jpg'
import newbook3 from '../assets/newbooks/newbook3.jpg'
import newbook4 from '../assets/newbooks/newbook4.jpg'


import read from '../assets/read.png'

import author1 from '../assets/authors/author1.jpg';
import author2 from '../assets/authors/author2.jpg';
import author3 from '../assets/authors/author3.jpg';
import author4 from '../assets/authors/author4.jpg';
import Authorcard from '../components/Authorcard';
import { useNavigate } from 'react-router-dom';


function Home(){
    const navigate = useNavigate();

   

    const books = [
    {
        id: 73,
        bookcover: book1,
        booktitle: "The Alchemist",
        author: "Paulo Coelho",
        rating: 4.6,
        price: "₹399"
    },
    {
        id: 62,
        bookcover: book2,
        booktitle: "Atomic Habits",
        author: "James Clear",
        rating: 4.8,
        price: "₹499"
    },
    {
        id: 121,
        bookcover: book3,
        booktitle: "The Psychology of Money",
        author: "Morgan Housel",
        rating: 4.7,
        price: "₹450"
    },
    {
        id: 66,
        bookcover: book4,
        booktitle: "Ikigai",
        author: "Héctor García & Francesc Miralles",
        rating: 4.5,
        price: "₹350"
    },
    {
        id: 13,
        bookcover: book5,
        booktitle: "The Midnight Library",
        author: "Matt Haig",
        rating: 4.4,
        price: "₹399"
    },
    {
        id: 122,
        bookcover: book6,
        booktitle: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        rating: 4.6,
        price: "₹299"
    },
    {
        id: 33,
        bookcover: book7,
        booktitle: "The Hobbit",
        author: "J.R.R. Tolkien",
        rating: 4.8,
        price: "₹599"
    },
    {
        id: 46,
        bookcover: book8,
        booktitle: "Pride and Prejudice",
        author: "Jane Austen",
        rating: 4.7,
        price: "₹349"
    }
    ];

    const newBooks = [
    {
        id: 123,
        bookcover: newbook1,
        booktitle: "The Heaven",
        author: "James McBride",
        rating: 4.5,
        price: "₹499"
    },
    {
        id: 124,
        bookcover: newbook2,
        booktitle: "Yellowface",
        author: "R. F. Kuang",
        rating: 4.4,
        price: "₹459"
    },
    {
        id: 125,
        bookcover: newbook3,
        booktitle: "Tomorrow",
        author: "Gabrielle Zevin",
        rating: 4.6,
        price: "₹549"
    },
    {
        id: 9,
        bookcover: newbook4,
        booktitle: "Lessons in Chemistry",
        author: "Bonnie Garmus",
        rating: 4.5,
        price: "₹499"
    }
    ];

    const authors = [
    {
        id: 1,
        authorimage: author1,
        authorname: "J.K. Rowling",
        books: "7 Books"
    },
    {
        id: 2,
        authorimage: author2,
        authorname: "James Clear",
        books: "3 Books"
    },
    {
        id: 3,
        authorimage: author3,
        authorname: "Matt Haig",
        books: "15 Books"
    },
    {
        id: 4,
        authorimage: author4,
        authorname: "Jane Austen",
        books: "6 Books"
    }
    ];
    
    return(
    <div>
        <section className="hero">
           <div className="hero-content">
            <h1>
              Find your<br />
              next story
            </h1>
            <p>Every page, a new journey.</p>
            <button onClick={() => navigate('/explore')}>
            EXPLORE BOOKS
             </button>
            </div>
            <div className="hero-image">
            <img src= {hero} alt="hero-banner"/>
            </div>
        </section>
        <section className="features">

                <div className="feature">
                    <i className="fa-regular fa-compass"></i>
                    <h3>Discover</h3>
                    <p>New Books</p>
                </div>

                <div className="feature">
                    <i className="fa-solid fa-book-open"></i>
                    <h3>Read</h3>
                    <p>Your Way</p>
                </div>

                <div className="feature">
                    <i className="fa-regular fa-heart"></i>
                    <h3>Save</h3>
                    <p>Your Favorites</p>
                </div>

                <div className="feature">
                    <i className="fa-solid fa-compass"></i>
                    <h3>Explore</h3>
                    <p>Endless Stories</p>
                </div>

        </section>
        
        <section className="trending-section">
            <h1>Trending Books</h1>
            <p>Stories readers are loving</p>

            <div className="book-container">
            {books.map(book => (
            <Bookcard
                key={book.id}
                id={book.id}
                bookcover={book.bookcover}
                booktitle={book.booktitle}
                author={book.author}
                rating={book.rating}
                price={book.price}
            />
            ))}
            </div>
        </section>
        <section className="new-arrivals-section">
            <h1>New Arrivals</h1>
            <p>Fresh stories to discover</p>

            <div className="new-books-container">
            {newBooks.map(book => (
            <Bookcard
                key={book.id}
                id={book.id}
                bookcover={book.bookcover}
                booktitle={book.booktitle}
                author={book.author}
                rating={book.rating}
                price={book.price}
            />
            ))}
            </div>
        </section>
        <section className="reading-section">

         <div className="reading-image">
        <img src={read} alt="Reading experience" />

        <div className="reading-quote">
            <i className="fa-solid fa-quote-left"></i>
            <p>A good book is a journey waiting to begin.</p>
        </div>
        </div>


        <div className="reading-content">

        <span className="reading-label">
            THE VAASI READING EXPERIENCE
        </span>

        <h1>
            Your books.<br />
            Your way of reading.
        </h1>

        <p className="reading-description">
            Make every reading session comfortable,
            personal and enjoyable.
        </p>


        <div className="reading-feature">

            <div className="reading-icon">
                <i className="fa-solid fa-book-open"></i>
            </div>

            <div>
                <span className="feature-number">01</span>
                <h3>Read</h3>
                <p>Read your favorite books comfortably anywhere.</p>
            </div>

        </div>


        <div className="reading-feature">

            <div className="reading-icon">
                <i className="fa-regular fa-bookmark"></i>
            </div>

            <div>
                <span className="feature-number">02</span>
                <h3>Bookmark</h3>
                <p>Never lose your place and continue whenever you want.</p>
            </div>

        </div>


        <div className="reading-feature">

            <div className="reading-icon">
                <i className="fa-solid fa-palette"></i>
            </div>

            <div>
                <span className="feature-number">03</span>
                <h3>Customize</h3>
                <p>Make your reading experience comfortable and personal.</p>
            </div>

        </div>


        <button className="reading-button" onClick={()=>navigate('/Read')}>
            START READING
            <i className="fa-solid fa-arrow-right"></i>
        </button>

    </div>

    </section>
    <section className="authors-section">

    <h1>Popular Authors</h1>

    <p>Meet the minds behind the stories</p>

    <div className="authors-container">

        {authors.map(author => (
            <Authorcard
                key={author.id}
                authorimage={author.authorimage}
                authorname={author.authorname}
                books={author.books}
            />
        ))}

    </div>

    </section>

    <section className="why-vaasi-section">

    <div className="why-vaasi-heading">
        <span>WHY VAASI?</span>

        <h1>
            More than just a bookstore.
            <br />
            It's your reading space.
        </h1>

        <p>
            Discover stories, enjoy meaningful reading,
            and build a library that belongs to you.
        </p>
    </div>


    <div className="why-vaasi-content">

        <div className="why-item">
            <span className="why-number">01</span>

            <i className="fa-solid fa-compass"></i>

            <h3>Discover</h3>

            <p>
                Find stories you'll love across different
                genres and explore something new.
            </p>
        </div>


        <div className="why-item">
            <span className="why-number">02</span>

            <i className="fa-solid fa-book-open"></i>

            <h3>Read</h3>

            <p>
                Enjoy your favorite books with a reading
                experience designed around you.
            </p>
        </div>


        <div className="why-item">
            <span className="why-number">03</span>

            <i className="fa-regular fa-bookmark"></i>

            <h3>Keep</h3>

            <p>
                Build your personal library and keep
                your favorite stories close.
            </p>
        </div>

    </div>

</section>
<section className="cta-section">

    <div className="cta-content">

        <span>READY TO READ?</span>

        <h1>
            Your next favorite book
            <br />
            is waiting.
        </h1>

        <p>
            Discover stories worth getting lost in.
        </p>

        <button className="cta-button" onClick={()=>navigate('/explore')}>
            EXPLORE BOOKS
            <i className="fa-solid fa-arrow-right"></i>
        </button>

    </div>

</section>
    </div>

    )
}
export default Home;