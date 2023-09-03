import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Machine.css";
export default function Machine() {
  const [products, setProducts] = useState([]);
  const [machine, setMachine] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [totalEntered, setTotalEntered] = useState([]); //keep total money
  const [entered, setEntered] = useState(0);
  const [total, setTotal] = useState(0);
  const [change, setChange] = useState(0);
  var productImgArr = []; //for dynamic product images
  let accepted = ["1", "5", "10", "20"];
  const inputRef = useRef(null);

  useEffect(() => {
    getProducts();
    getMachine();
  }, []);

  //axios requests from backend
  const getProducts = async () => {
    var result = await axios.get("http://localhost:8080/api/products");
    setProducts(result.data);
  };

  const getMachine = async () => {
    try {
      var result = await axios.get("http://localhost:8080/api/machine/1");
      setMachine(result.data);
    } catch (e) {
      setError(e.response.data);
    }
  };

  //for selected product radio button event
  const handleChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  //keep entered money
  const handleInput = (value) => {
    setEntered(value);
  };

  //for dynamic product images
  const imgProduct = (product) => {
    productImgArr = [];
    let stock = product.stock;
    //If there is stock >= 5, 5 items will be displayed on the screen.
    if (stock >= 5) stock = 5;
    else if (stock < 1) stock = 0;
    for (let i = 0; i < stock; i++) {
      productImgArr.push(
        <img
          className="image"
          src={"/images/" + product.name.toLowerCase() + ".png"}
          alt={product.name.toLowerCase()}
        ></img>
      );
    }
    return productImgArr;
  };

  //add entered money
  const addMoneyClick = () => {
    if (accepted.includes(entered)) {
      //money control
      setTotalEntered((current) => [...current, entered]);
      setError(null);
      inputRef.current.value = null;
      setTotal(+total + +entered); //for sum with string
    } else {
      setError("Please enter 1, 5, 10 or 20 unit money!");
    }
    setEntered(0);
  };

  //cancel process
  const handleCancel = () => {
    setChange(total);
    inputRef.current.value = null;
    setTotalEntered([]);
    if (total > 0) setError("Your money of " + total + "₺ has been refunded!");
    setTotal(0);
    setEntered(0);
  };

  //order process
  const handleOrder = () => {
    if (selectedProduct != "0") {
      setError(null);
    } else {
      setError("Please select a product!");
    }
  };

  return (
    <div>
      <div className="machine">
        <div className="items">
          {products.map((product, index) => (
            <div className="shelf" id={product.name.toLowerCase()}>
              {imgProduct(product)}
            </div>
          ))}
        </div>

        <div className="order">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
          <div className="container">
            <div className="process">
              <input
                type="number"
                className="priceEnter"
                id="priceInput"
                min="0"
                onChange={(i) => handleInput(i.target.value)}
                ref={inputRef}
              ></input>
              <button onClick={() => addMoneyClick()} className="addBtn">
                Add
              </button>
            </div>
            <div className="totalEntered">
              <label>Total: {total}₺</label>
            </div>

            <div className="buttons">
              <button onClick={handleOrder} className="orderBtn">
                Order
              </button>
              <button onClick={handleCancel} className="cancelBtn">
                Cancel
              </button>
            </div>

            <div className="selectProducts">
              {products.map((product, index) => (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="productRadio"
                    id={product.id}
                    disabled={product.stock < 1 ? true : false}
                    onChange={handleChange}
                    value={product.id}
                  />
                  <label className="form-check-label" htmlFor={product.id}>
                    {product.name}
                    <small>
                      {" "}
                      {product.stock < 1 ? "No stock" : product.price + "₺"}
                    </small>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="change">
            <div className="price">
              <div className="circle"></div>
            </div>
          </div>
        </div>

        <div className="result">
          <div className="rectangle"></div>
        </div>
        <div className="bg">
          <img className="imageBg" src="/images/bg.png" alt=""></img>
        </div>
      </div>
      <div className="leg">
        <div className="foot"></div>
        <div className="foot"></div>
      </div>
    </div>
  );
}
