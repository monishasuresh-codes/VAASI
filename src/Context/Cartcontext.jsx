import { createContext, useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

const CartContext = createContext()

function Cartprovider({ children }) {

    const { currentUser } = useContext(UserContext)

    const [cart, setcart] = useState([])
    useEffect(() => {
        if (!currentUser) {
            setcart([])
            return
        }
        const cartKey = `vaasi-cart-${currentUser.email}`
        const savedCart = localStorage.getItem(cartKey)
        setcart(savedCart ? JSON.parse(savedCart) : [])
    }, [currentUser])

    const quantity = 1


    const addTocart = (book) => {
        if (!currentUser) {
            return;
        }
        const alreadyAdded = cart.some(
            (item) => item.id === book.id)
        if (alreadyAdded) {
            alert("Already added")
            return
        }
        else {
            const cartItem = {
                ...book,
                quantity
            }
            const updatedcart = [...cart, cartItem]
            setcart(updatedcart)
            localStorage.setItem(`vaasi-cart-${currentUser.email}`, JSON.stringify(updatedcart))
            alert("Added to Cart")
        }
    }

    const removeFromCart = (id) => {
        const updatedcart = cart.filter((book) =>
            book.id !== id)
        setcart(updatedcart)
        localStorage.setItem(`vaasi-cart-${currentUser.email}`, JSON.stringify(updatedcart))
    }

    const increase = (id) => {

        const updatedcart = cart.map((book) => {
            if (book.id === id) {
                return {
                    ...book,
                    quantity: book.quantity + 1
                }

            }
            return book
        })
        setcart(updatedcart)
        localStorage.setItem(`vaasi-cart-${currentUser.email}`, JSON.stringify(updatedcart))

    }

    const decrease = (id) => {

        const updatedcart = cart.map((book) => {
            if (book.id === id && book.quantity > 1) {
                return {
                    ...book,
                    quantity: book.quantity - 1
                }

            }
            return book
        })
        setcart(updatedcart)
        localStorage.setItem(`vaasi-cart-${currentUser.email}`, JSON.stringify(updatedcart))

    }
    return (
        <CartContext.Provider value={[cart, addTocart, removeFromCart, increase, decrease]}>
            {children}
        </CartContext.Provider>
    )
}

export { Cartprovider }

export default CartContext;