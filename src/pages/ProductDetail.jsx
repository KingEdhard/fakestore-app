import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAPI from "../hooks/useAPI";
import { useCartContext } from "../provider/CartProvider";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Obtenemos el parámetro id de la ruta
  const { getProducts } = useAPI();
  const { state, dispatch } = useCartContext();
  const { cart } = state; // Accedemos a la propiedad cart del estado

  useEffect(() => {
    getProducts()
      .then((products) => {
        // Buscamos el producto que tenga el mismo id que el parámetro
        const product = products.find((product) => product.id === parseInt(id));
        setProduct(product);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [getProducts, id]); // Agregamos getProducts e id al arreglo de dependencias

  // Creamos una función que verifica si un producto está en el carrito o no
  const isInCart = (product) => cart.some((item) => item.id === product.id);

  return (
    <div className="flex-1 flex flex-col gap-4 p-4">
      <h1>Detalle del producto</h1>
      {loading && <p>Cargando...</p>}
      {!loading && product && (
        // Renderizamos la información del producto y el botón de agregar o eliminar
        <div className="flex flex-col border border-gray-300 shadow-sm rounded-xl p-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-28 object-cover self-center"
          />
          <h2 className="font-bold">{product.title}</h2>
          <p>{product.description}</p>
          <span>${product.price}</span>
          {/* Usamos la función isInCart para condicionar el renderizado del botón
            de agregar o eliminar */}
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
      )}
    </div>
  );
};
export default ProductDetail;
