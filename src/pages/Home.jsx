import Navbar from "../features/Navbar/Navbar";
import ProductList from "../features/product/Components/ProductList";

const Home = () => {
    return (
        <>
          <Navbar>
           <ProductList></ProductList>
            </Navbar>  
        </>
    );
};

export default Home;