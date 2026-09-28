import './Explore.css';
import Bookcard from '../components/Bookcard';
import Bookdata from '../data/Bookdata';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Explore() {
    const [searchParams] = useSearchParams()
    const genreFromUrl = searchParams.get('genre')
    const [search,setsearch] = useState('')
    const [selectedgenre,setselectedgenre] = useState(genreFromUrl || 'All')
    const [sortby,setsortby] = useState('Popular')
    const [visiblebooks,setvisiblebooks] = useState(12)
    


    useEffect(()=>{
        setvisiblebooks(12)},
        [search,selectedgenre]
    )

    const filteredbooks = Bookdata.filter((book) => {
        const matchessearch = book.booktitle.toLowerCase()
                            .includes(search.toLowerCase())

        const matchesgenre = selectedgenre === 'All' ||
                             book.genre === selectedgenre

        return matchessearch && matchesgenre
    })

    let sortedbooks = [...filteredbooks]

    if (sortby === "Highest Rated"){
        sortedbooks.sort( (a,b) => b.rating- a.rating)
    }
    if (sortby === 'Price: Low to High') {
    sortedbooks.sort(
        (a, b) =>
            parseInt(a.price.replace('₹', '').replace(',', '')) -
            parseInt(b.price.replace('₹', '').replace(',', ''))
    );
    }

    if (sortby === 'Price: High to Low') {
    sortedbooks.sort(
        (a, b) =>
            parseInt(b.price.replace('₹', '').replace(',', '')) -
            parseInt(a.price.replace('₹', '').replace(',', ''))
    );
    }

    return (
        <div className="explore-page">

            <section className="explore-header">
                <h1>Explore Books</h1>
                <p>Find a story that feels like yours.</p>
            </section>

            
            <div className="search-box">
                <input type="text" 
                placeholder="Search Books..." 
                value={search}
                onChange={(e)=>setsearch(e.target.value)}
                />
            </div>

            <div className="explore-controls">

    <p>Showing {Math.min(visiblebooks,sortedbooks.length)} of {sortedbooks.length} books</p>

    <div className="sort-box">
        <label htmlFor="sort">Sort by:</label>

        <select
            id="sort"
            value={sortby}
            onChange={(e) => setsortby(e.target.value)}
        >
            <option value="Popular">Popular</option>
            <option value="Highest Rated">Highest Rated</option>
            <option value="Price: Low to High">
                Price: Low to High
            </option>
            <option value="Price: High to Low">
                Price: High to Low
            </option>
        </select>
    </div>

</div>

            <div className="genre-buttons">
                <button onClick={()=> setselectedgenre('All')} 
                    className={selectedgenre === 'All' ? 'active' : ''}>
                    All
                </button>
                <button onClick={()=> setselectedgenre('Fiction')}
                    className={selectedgenre === 'Fiction' ? 'active' : ''}>
                    Fiction
                </button>
                <button onClick={()=> setselectedgenre('Romance')}
                    className={selectedgenre === 'Romance' ? 'active' : ''}>
                    Romance
                </button>
                <button onClick={()=> setselectedgenre('Mystery')}
                    className={selectedgenre === 'Mystery' ? 'active' : ''}>
                    Mystery
                </button>
                <button onClick={()=> setselectedgenre('Fantasy')}
                    className={selectedgenre === 'Fantasy' ? 'active' : ''}>
                    Fantasy
                </button>
                <button onClick={()=> setselectedgenre('Sci-Fiction')}
                    className={selectedgenre === 'Sci-Fiction' ? 'active' : ''}>
                    Sci-Fiction
                </button>
                <button onClick={()=> setselectedgenre('History')}
                    className={selectedgenre === 'History' ? 'active' : ''}>
                    History
                </button>
                <button onClick={()=> setselectedgenre('Self-Grow')}
                    className={selectedgenre === 'Self-Grow' ? 'active' : ''}>
                    Self-Grow   
                </button>
                <button onClick={()=> setselectedgenre('Technology')}
                    className={selectedgenre === 'Technology' ? 'active' : ''}>
                    Technology
                </button>
                
            </div>

            <div className="book-grid">

                {filteredbooks.length>0 ?(

                sortedbooks.slice(0,visiblebooks).map((book) => (
                    <Bookcard
                        key={book.id}
                        id={book.id}
                        bookcover={book.bookcover}
                        booktitle={book.booktitle}
                        author={book.author}
                        rating={book.rating}
                        price={book.price}
                        genre={`Genre : ${book.genre}`}
                    />
                ))
            ):
            (
                   <div className="no-books">
                   <h2>No books found</h2>
                   <p>Try searching for another book.</p>
                   </div>

                )}

               

            </div>
            <div className='explore-buttons'>
             {visiblebooks < sortedbooks.length && (
                    <div className="load-more-container">
                    <button
                    className="load-more"
                    onClick={() => setvisiblebooks(visiblebooks + 12)}
                     >
                     Load More Books...
                    </button>
                    </div>
                )}
                {visiblebooks > 12 && (
                    <div className="load-more-container">
                    <button
                    className="load-more"
                    onClick={() => setvisiblebooks( 12)}
                     >
                     Show Less...
                    </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Explore;