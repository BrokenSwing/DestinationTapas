import React from 'react';
import "aviator";
import NavBar from "./components/NavBar"
import Footer from "./components/Footer";
import UserSelector from "./components/UserSelector";

function App() {
  return (
    <>
        <NavBar />
        <UserSelector users={[
            {
                name: "Florent",
                id: 0,
            },
            {
                name: "Simon",
                id: 1,
            },
            {
                name: "Tim",
                id: 2,
            },
            {
                name: "Thomas",
                id: 3,
            },
            {
                name: "Aurelien",
                id: 4,
            }
        ]}/>
        <Footer />
    </>
  );
}

export default App;
