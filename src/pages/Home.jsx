import { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import ProductItem from "../components/ProductItem";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getProducts } = useAPI();

  // Creamos un estado local para el valor del campo de texto
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts()
      .then((products) => {
        setProducts(products);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [getProducts]); // Agregamos getProducts al arreglo de dependencias

  return (
    <div className="flex-1 flex flex-col gap-4 p-4">
      <h1>FakeStore</h1>
      {loading && <p>Cargando...</p>}
      {!loading && (
        <div>
          {/* Agregamos el elemento input con los atributos value y onChange */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto..."
          />
          {/* Filtramos los productos según el valor del estado */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products
              .filter((product) =>
                product.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
