import { BrowserRouter,  Routes , Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Explore from "./pages/Explore";
import Bookdetails from "./pages/Bookdetails";
import ScrollToTop from "./components/ScrollToTop";
import { Cartprovider } from "./Context/Cartcontext";
import Cart from "./pages/Cart";
import { Wishlistprovider } from "./Context/Wishlistcontext";
import Wishlist from "./pages/Wishlist";
import Read from "./pages/Read";
import Reader from "./pages/Reader";
import Categories from "./pages/Catogories";
import Library from "./pages/Library";
import { UserProvider } from "./Context/UserContext";
import Signup from "./pages/Signup";
import Userlogin from "./pages/Userlogin";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";

function App() {
  return (
    <div >
      <BrowserRouter>
      <UserProvider>
      <Cartprovider>
      <Wishlistprovider>
      <Navbar/>
      <Auth/>
      <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Read" element={<Read/>}></Route>
          <Route path="/reader/:id" element={<Reader/>}></Route>
          <Route path="/categories" element={<Categories/>}></Route>
          <Route path="/library" element={<Library/>}></Route>
          <Route path="/explore" element={<Explore/>} ></Route>
          <Route path="/wishlist" element={<Wishlist/>}></Route>
          <Route path="/cart" element={<Cart/>} ></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Userlogin/>} />
          
          <Route path="/book/:id" element={<Bookdetails/>}></Route>
        </Routes>
        
        </Wishlistprovider>
        </Cartprovider>
        </UserProvider>
      
      
      </BrowserRouter>
      <Footer/>
      
    </div>
  );
}

export default App;
