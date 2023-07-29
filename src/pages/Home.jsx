import Navbar from "../features/Navbar/Navbar";
import ProductList from "../features/product-list/ProductList";

const Home = () => {
    return (
        <>
          <Navbar>
            <ProductList/>
            </Navbar>  
        </>
    );
};

export default Home;