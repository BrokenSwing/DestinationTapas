import React from 'react';
import "aviator";
import NavBar from "./components/NavBar"
import Footer from "./components/Footer";
import ProductsDisplay from "./components/products/ProductsDisplay";

function App() {
  return (
    <>
        <NavBar />
        <ProductsDisplay />
        <Footer />
    </>
  );
}

export default App;
