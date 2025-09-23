import './App.css';  
import { NavBar } from "./components/NavBar.jsx";
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



