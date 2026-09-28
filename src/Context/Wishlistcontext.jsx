import UserContext from "./UserContext";

const { createContext, useState, useContext, useEffect } = require("react");

const Wishlistcontext = createContext();

function Wishlistprovider({ children }) {
    const {currentUser}= useContext(UserContext)
    const [wishlist, setwishlist] = useState([]);
    useEffect(()=>{
        if(!currentUser){
            setwishlist([])
            return
        }
        const wishlistKey = `vaasi-wishlist-${currentUser.email}`
        const savedWishlist = localStorage.getItem(wishlistKey)
        setwishlist(savedWishlist?JSON.parse(savedWishlist):[])
    },[currentUser])
    

    const addTowishlist = (book) => {
        if(!currentUser){
           
            return
        }
        const alreadyExist = wishlist.some(
            (item) => item.id === book.id
        );

        if (alreadyExist) {
            return;
        } else {
            const updatedWishlist = [...wishlist, book];

            setwishlist(updatedWishlist);

            localStorage.setItem(
                `vaasi-wishlist-${currentUser.email}`,
                JSON.stringify(updatedWishlist)
            );

            alert("Added to Wishlist");
        }
    };

    const removeFromwishlist = (id) => {
        const updatedWishlist = wishlist.filter(
            (book) => book.id !== id
        );

        setwishlist(updatedWishlist);

        localStorage.setItem(
            `vaasi-wishlist-${currentUser.email}`,
            JSON.stringify(updatedWishlist)
        );
    };

    return (
        <Wishlistcontext.Provider
            value={[wishlist, addTowishlist, removeFromwishlist]}
        >
            {children}
        </Wishlistcontext.Provider>
    );
}

export { Wishlistprovider };
export default Wishlistcontext;