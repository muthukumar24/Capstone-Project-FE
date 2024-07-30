import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { OrderContext } from "../context/OrderContext";
import { ClipLoader } from "react-spinners";

const stripePromise = loadStripe('pk_test_51PcnqX2KJIH2OUzydtLKgZr3xKT0rIaBTSGfOfDhADmPL4IQhnhr4FRRMSRj1rLx0ENLdy92PtbG700EdXpHWqYy00SxBpRW21');

const BuyNow = () => {
  const location = useLocation();
  const { item } = location.state;
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false); // State for loading spinner
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { fetchOrders } = useContext(OrderContext);

  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) => {
      const newQuantity =
        type === "increment"
          ? prevQuantity + 1
          : prevQuantity > 1
          ? prevQuantity - 1
          : 1;
      return newQuantity;
    });
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true); // Start loading spinner

    const orderDetails = {
      products: [
        { item: item._id, name: item.name, price: item.price, quantity },
      ],
      amount: item.price * quantity,
      paymentMethod,
      status: "pending",
    };

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (paymentMethod === "card" && (!stripe || !elements)) {
      setLoading(false); // Stop loading spinner
      return;
    }

    if (paymentMethod === "card") {
      const card = elements.getElement(CardElement);
      const result = await stripe.createToken(card);

      if (result.error) {
        console.error(result.error.message);
        setLoading(false); // Stop loading spinner
      } else {
        try {
          const response = await axios.post(
            "https://capstone-project-be-f7p8.onrender.com/api/payment",
            {
              ...orderDetails,
              token: result.token.id,
            },
            config
          );

          setLoading(false); // Stop loading spinner

          if (response.data.success) {
            alert("Payment Successful!");
            fetchOrders();
            navigate("/orders");
          } else {
            alert("Payment failed. Please try again.");
          }
        } catch (error) {
          console.error("Error processing payment:", error);
          setLoading(false); // Stop loading spinner
        }
      }
    } else {
      try {
        const response = await axios.post(
          "https://capstone-project-be-f7p8.onrender.com/api/payment",
          orderDetails,
          config
        );

        setLoading(false); // Stop loading spinner

        if (response.data.success) {
          alert("Order Placed Successfully");
          fetchOrders();
          navigate("/orders");
        } else {
          alert("Order placement failed. Please try again.");
        }
      } catch (error) {
        console.error("Error placing order:", error);
        setLoading(false); // Stop loading spinner
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <h2 className="text-center mb-3 fw-semibold buynow-header-text">
          Buy Now
        </h2>
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 px-5">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-10 col-md-10 col-lg-10 col-xl-10">
              <div className="card mb-4 buynow-card">
                <div className="d-flex justify-content-center">
                {item.images && (
                  <img
                    src={item.images[0]}
                    className="card-img-top px-2 py-2 buynow-card-image"
                    alt={item.name}
                  />
                )}
                </div>
                <div className="card-body">
                  <h5 className="card-title mb-3">{item.name}</h5>
                  <p className="card-text">
                    <b>Description</b>: {item.description}
                  </p>
                  <p className="card-text">
                    <b>Price</b>: ${item.price}
                  </p>
                  <p className="card-text">
                    <b>Available Stock</b>: {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div className="d-flex align-items-center">
            <span>
              <b>Quantity</b>: &nbsp;
            </span>
            <button
              className="quantity-btn px-3"
              onClick={() => handleQuantityChange("decrement")}
            >
              -
            </button>
            <span className="mx-3">{quantity}</span>
            <button
              className="quantity-btn px-3"
              onClick={() => handleQuantityChange("increment")}
            >
              +
            </button>
          </div>
          <p className="card-text mt-3">
            <b>Price</b>: $ {item.price}
          </p>
          <p className="card-text mt-3">
            <b>Total Quantity</b>: {quantity}
          </p>
          <p className="card-text mt-3">
            <b>Total Amount</b>: $ {item.price * quantity}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="paymentMethod" className="mb-2">
                <b>Payment Method</b>
              </label>
              <select
                id="paymentMethod"
                className="form-control form-select w-50 payment-select"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <option value="card">Card</option>
                <option value="cash">Cash on Delivery</option>
              </select>
            </div>
            {paymentMethod === "card" && (
              <div className="form-group mt-4 card-element">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            )}

            <div className="d-flex gap-3">
              <button
                className="order-buynow-btn px-4 py-2 mt-4"
                type="submit"
              disabled={loading || (paymentMethod === "card" && !stripe)}
              style={{ minWidth: "120px" }}
              >
                {loading ? 
                  <div className="d-flex justify-content-center align-items-center">
                    <ClipLoader size={20} color={"#fff"} />
                  </div> : "Buy Now"}
              </button>
              <Link to={"/inventory"}>
                <button className="order-cancel-btn px-4 py-2 mt-4">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const WrappedBuyNow = () => (
  <Elements stripe={stripePromise}>
    <BuyNow />
  </Elements>
);

export default WrappedBuyNow;

