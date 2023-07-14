import { Link } from "react-router-dom";
import { useCartContext } from "../provider/CartProvider";

//Crear componente de barra de navegación
const NavBar = () => {
  // Importamos el hook useCartContext y obtenemos el estado y la propiedad cart
  const { state } = useCartContext();
  const { cart } = state;

  return (
    /*
    Altura de 20, con ancho de todo el contenido
    fondo de colo negro, con un pading de 4, que sea flex
    (es decir, que los elementos se van a ir poniendo uno al lado del otro)
    justificado alineados con un espacio en el centro (es decir, un elemnto al
    inicio y el otro al final) que todo el texto sea blanco y por último agregamos
    una clase para que los elemntos se alinien al centro de la barra.
    */
    <nav className="h-20 w-full bg-black p-4 flex justify-between text-white items-center">
      {/* Creamos un objeto de tipo link importado de react-router-dom y le ponemos
        la referencia para que el primero nos redirecciona a la raíz (Fakestore)
        y el segundo al carrito, */}
      <Link to="/">
        <span>FakeStore</span> {/* Raíz del objeto ("/") */}
      </Link>
      <Link to="/carrito"> {/* Raíz del carrito ("/carrito") */}
        <span>Carrito</span>
        {/* Agregamos un elemento que muestre la longitud del arreglo cart */}
        <span className="bg-white text-black rounded-full p-1 ml-2">
          {cart.length}
        </span>
      </Link>
    </nav>
  );
};
export default NavBar;
