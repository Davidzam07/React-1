import './App.css';  
import { NavBar } from "./components/navbar";
import { ItemListContainer } from "./components/itemlistcontainer";

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer saludo="¡Bienvenido a mi tienda de ropa online!"/>
    </>
  );
}

export default App;



