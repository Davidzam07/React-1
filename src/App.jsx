import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import  ItemListContainer  from "./components/ItemListContainer";
import  ItemDetailContainer from "./components/ItemDetailContainer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
      
        <Route path="/" element={<ItemListContainer greeting="Catálogo de productos" />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />     
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




