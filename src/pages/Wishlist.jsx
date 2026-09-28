import { useContext } from "react";
import Wishlistcontext from "../Context/Wishlistcontext";
import Wishlistcard from "../components/Wishlistcard";
import './Wishlist.css'
function Wishlist(){
    const [wishlist,,removeFromwishlist]=useContext(Wishlistcontext)
    return(
        <div className="wishlist-page">

    <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>Your saved stories, waiting for you.</p>
        <div className="wishlist-line"></div>
    </div>

    {wishlist.length === 0 ?(
        <div className="empty-cart">
                    <h2>Your wishlist is empty</h2>
                    <p>Discover a new story and add it to your collection.</p>
                </div>
    ):(

    <div className="wishlist-container">

        {wishlist.map((book) => (
            <Wishlistcard
                key={book.id}
                book={book}
                removeFromwishlist={removeFromwishlist}
            />
        ))}

    </div>
    )}
</div>

        
    )
}
export default Wishlist;