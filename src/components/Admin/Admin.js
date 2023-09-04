import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Admin.css";
export default function Admin() {
  const [products, setProducts] = useState([]);
  const [machine, setMachine] = useState([]);
  const [error, setError] = useState(null);
  const moneyRef = useRef(null);
  const dateRef = useRef(null);
  const [product, setProduct] = useState({
    price: 0,
    stock: 0,
  });
  const [productId, setProductId] = useState(0);
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

  //update product
  const updateProduct = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/products/${productId}`, product);
  };

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setProductId(e.target.id);
  };

  //collect money
  const collectMoney = async () => {
    moneyRef.current.value = 0;

    await axios.put("http://localhost:8080/api/machine/1", { totalPrice: 0 });
  };

  //chech machine
  const check = async () => {
   
    var currentdate = new Date();
    var datetime =currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();
   dateRef.current.value = datetime;
    await axios.put("http://localhost:8080/api/machine/1", { coolingDate: datetime });
  };

  return (
    <div>
      <div className="machine-admin">
        <div className="card cardMachine">
          <h5 className="card-title mt-2">Machine</h5>
          <img
            className="card-img-top"
            src="/images/vending-machine.png"
            alt="Card image cap"
          />
          <div className="card-body">
            <div className="mb-3">
              <form>
                <div className="form-group row mb-2">
                  <label htmlFor="cooling" className="col-sm-5 col-form-label">
                    Last Check:
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control"
                      name="cooling"
                      value={machine.coolingDate == null ? "-" : machine.coolingDate}
                      readOnly
                      ref={dateRef}
                    ></input>
                  </div>
                </div>

                <div className="form-group row mb-2">
                  <label htmlFor="price" className="col-sm-5 col-form-label">
                    Total Price (₺):
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      value={machine.totalPrice}
                      readOnly
                      ref={moneyRef}
                    ></input>
                  </div>
                </div>
                <div className="buttonsForm">
                  <button type="button" className="btn btn-outline-primary" onClick={check}>
                    Check
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={collectMoney}
                  >
                    Collect
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="cards">
        {products.map((product, index) => (
          <div className="card">
            <h5 className="card-title mt-2">{product.name}</h5>
            <img
              className="card-img-top"
              src={`/images/${product.name.toLowerCase()}.png`}
              alt="Card image cap"
            />
            <div className="card-body">
              <div className="mb-3">
                <form onSubmit={(e) => updateProduct(e)}>
                  <div className="form-group row mb-2">
                    <label htmlFor="price" className="col-sm-5 col-form-label">
                      Price (₺):
                    </label>
                    <div className="col-sm-5">
                      <input
                        required
                        type="number"
                        className="form-control"
                        name="price"
                        id={product.id}
                        defaultValue={product.price}
                        onChange={(e) => onInputChange(e)}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="stock" className="col-sm-5 col-form-label">
                      Stock:
                    </label>
                    <div className="col-sm-5">
                      <input
                        required
                        type="number"
                        className="form-control"
                        name="stock"
                        id={product.id}
                        defaultValue={product.stock}
                        onChange={(e) => onInputChange(e)}
                      ></input>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-outline-success mt-3"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
