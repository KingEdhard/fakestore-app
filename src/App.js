import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail"; // Importamos el componente ProductDetail
import { CartProvider } from "./provider/CartProvider";
function App() {
  return (
    <CartProvider>
      {/* Creamos el objeto para agregar enlaces directamente en la página
          importado directamente desde react-router-dom
          (<BrowserRouter></BrowserRouter>) */}
      <BrowserRouter>
        {/* Definimos una clase para que la pantalla para siempre tenga al menos el
            tamaño de la pantalla en alto y que todos los elementos vayan
            hacia abajo apilados */}
        <main className="min-h-screen flex flex-col">
          {/* importamos el componente de de la barra de navegación */}
          <NavBar />
          {/* Definimos las rutas de los componentes */}
          <Routes>
            {/* Creamos en la raíz exacta, en la carpeta pages un componente
            llamado Home.jsx */}
            <Route path="/" exact element={<Home />} />
            {/* Creamos una página dentro de la carpeta pagesque se un carrito (Cart)
              siguiendo las prácticas desde la raíz exacta, la llamamos y despues
              creamos el componente */}
            <Route path="/carrito" exact element={<Cart />} />
            {/* Creamos una nueva ruta con un parámetro dinámico id y como elemento el
              componente ProductDetail */}
            <Route path="/producto/:id" exact element={<ProductDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}
export default App;
