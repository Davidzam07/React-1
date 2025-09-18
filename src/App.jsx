import './App.css';  
import { NavBar } from "./components/navbar.jsx";
import { ItemListContainer } from "./components/itemlistcontainer.jsx";

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer saludo="¡Bienvenido a mi tienda de ropa online!"/>
    </>
  );
}

export default App;



