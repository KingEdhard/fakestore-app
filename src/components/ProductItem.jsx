import { useCartContext } from "../provider/CartProvider";
import { Link } from "react-router-dom"; // Importamos el componente Link

const ProductItem = ({ product }) => {
  // Obtenemos el estado y el dispatch del contexto y accedemos a la propiedad cart
  const { state, dispatch } = useCartContext();
  const { cart } = state;

  // Creamos una función que verifica si un producto está en el carrito o no
  const isInCart = (product) => cart.some((item) => item.id === product.id);

  return (
    <div className="flex flex-col border border-gray-300 shadow-sm rounded-xl p-4">
      {/* Envolver la imagen con el Link que redirija a la ruta del detalle del producto con el id correspondiente */}
      <Link to={`/producto/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-28 object-cover self-center"
        />
        <h2 className="font-bold">{product.title}</h2>
      </Link>
      <span>${product.price}</span>
      {/* Usar la función isInCart para condicionar el renderizado del botón de agregar o eliminar */}
      {isInCart(product) ? (
        <button
          className="bg-red-500 hover:bg-red-700 text-white rounded-md p-2 mt-2"
          onClick={() => {
            dispatch({ type: "REMOVE_FROM_CART", payload: product });
            alert("Producto eliminado del carrito");
          }}
        >
          Eliminar del carrito
        </button>
      ) : (
        <button
          className="bg-black hover:bg-gray-800 text-white rounded-md p-2 mt-2"
          onClick={() => {
            dispatch({ type: "ADD_TO_CART", payload: product });
            alert("Producto añadido al carrito");
          }}
        >
          Añadir al carrito
        </button>
      )}
    </div>
  );
};
export default ProductItem;
