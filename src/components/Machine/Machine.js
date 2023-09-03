import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Machine.css";
export default function Machine() {
  // const c=[]
  // for(let i=0 ;i<2;i++){
  //   c.push(<img className="image" src="/images/water.png" alt="water"></img>);
  // }
  // const p = ()=>{
  //   return(<img className="image" src="/images/water.png" alt="water"></img>);
  // }

  // const designProduct = (product)=>{

  // }
  const [products, setProducts] = useState([]);
  const [machine, setMachine] = useState([]);

  useEffect(() => {
    getProducts();
    getMachine();
  }, []);

  const getProducts = async() => {
    var result = await axios.get("http://localhost:8080/api/products");
    setProducts(result.data);
  };

  const getMachine = async() => {
    var result = await axios.get("http://localhost:8080/api/machine/1");
    setMachine(result.data);
  }

  return (
    <div>
      <div className="machine">
        <div className="items">
          <div className="shelf" id="water">
            <img className="image" src="/images/water.png" alt="water"></img>
            <img className="image" src="/images/water.png" alt="water"></img>
            <img className="image" src="/images/water.png" alt="water"></img>
            <img className="image" src="/images/water.png" alt="water"></img>
            <img className="image" src="/images/water.png" alt="water"></img>
          </div>
          <div className="shelf" id="coke">
            <img className="image" src="/images/coke.png" alt="coke"></img>
            <img className="image" src="/images/coke.png" alt="coke"></img>
            <img className="image" src="/images/coke.png" alt="coke"></img>
            <img className="image" src="/images/coke.png" alt="coke"></img>
            <img className="image" src="/images/coke.png" alt="coke"></img>
          </div>
          <div className="shelf" id="soda">
            <img className="image" src="/images/soda.png" alt="soda"></img>
            <img className="image" src="/images/soda.png" alt="soda"></img>
            <img className="image" src="/images/soda.png" alt="soda"></img>
            <img className="image" src="/images/soda.png" alt="soda"></img>
            <img className="image" src="/images/soda.png" alt="soda"></img>
          </div>
        </div>

        <div className="order">
          <div className="container">
            <div className="process">
              <input
                type="number"
                className="priceEnter"
                id="priceInput"
                min="0"
              ></input>
              <button className="addBtn">Add</button>
            </div>
            <div className="buttons">
              <button className="orderBtn">Order</button>
              <button className="cancelBtn">Cancel</button>
            </div>
            <div className="selectProducts">
              {products.map((product, index) => (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="productRadio"
                    id={product.name}
                  />
                  <label className="form-check-label" htmlFor={product.name}>
                    {product.name}<small> {product.price}₺</small>
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
