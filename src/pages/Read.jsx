import ReadBookCard from '../components/Readbookcard';
import './Read.css'
import ReadBookData from '../data/Readbookdata';

function Read() {
    const readbooks = ReadBookData
    
    return (
        <div className="read-page">

            <section className="read-hero">
                <p className="read-subtitle">VAASI • READ FOR FREE</p>

                <h1>Stories Waiting to Be Read</h1>

                <p className="read-description">
                    Discover timeless stories and classic books
                    that you can read freely, anytime.
                </p>
            
            <br/><br/>
            
<section className="free-books">

    <div className="free-books-heading">

        <div>
            <p className="free-books-label">VAASI COLLECTION</p>

            <h2>Free to Read</h2>
        </div>

        <span>Classic stories, timeless journeys.</span>

    </div>

</section>
<div className="free-books-grid">

        
            {readbooks.map(book => {
              return(<ReadBookCard
                key={book.id}
                id={book.id}
                cover={book.cover} 
                title={book.title}
                author={book.author}
                genre={book.genre}
                />)
            })}

            

    </div>


            </section>

        </div>
    );
}

export default Read;