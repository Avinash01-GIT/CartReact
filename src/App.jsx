import "./App.css";
import pokeballGif from "./assets/pokeball-pokemon.gif";
import redball from "./assets/redball.png";
import blueball from "./assets/blueball.png";
import blackball from "./assets/blackball.png";
import violetball from "./assets/violetball.png";
import { useState } from "react";

const productList = [
  { id: 1, name: "PokeBall", price: 100, image: redball },
  { id: 2, name: "GreatBall", price: 300, image: blueball },
  { id: 3, name: "UltraBall", price: 600, image: blackball },
  { id: 4, name: "MasterBall", price: 900, image: violetball },
];

const App = () => {
  const [products, setProducts] = useState(
    productList.map((product) => ({ ...product, quantity: 0 }))
  );

  const updateQuantity = (id, delta) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity + delta) }
          : product
      )
    );
  };

  const totalPrice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="main">
      <div className="porducts">
        <div className="products-heading">
          <h1>PokeMart</h1>
          <div className="topgif">
            <img src={pokeballGif} alt="Pokeball" />
          </div>
        </div>

        <div className="productsList">
          {products.map((product) => (
            <div className="productDiv" key={product.id}>
              <div className="product-name">{product.name}</div>
              <div className="product-price">{product.price}</div>
              <div className="countOfProduct">
                <button
                  className="minus"
                  onClick={() => updateQuantity(product.id, -1)}
                >
                  -
                </button>
                <div className="countDisplay">{product.quantity}</div>
                <button
                  className="plus"
                  onClick={() => updateQuantity(product.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cart">
        <h1>Cart</h1>
        <div className="addedProducts">
          {products.filter((product) => product.quantity > 0).length === 0 ? (
            <p className="nullMessage">No Products Added</p>
          ) : (
            products
              .filter((product) => product.quantity > 0)
              .map((product) => (
                <div className="total" key={product.id}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ height: "40px", width: "40px" }}
                  />
                  <div className="cartName">{product.name}</div>
                  <div className="cartPrice">
                    <span>{product.quantity} </span>
                    <span> x </span> {product.price}{" "}
                  </div>
                </div>
              ))
          )}
        </div>
        <div className="total">
          <div className="title">Total Price :</div>
          <div className="price">{totalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
