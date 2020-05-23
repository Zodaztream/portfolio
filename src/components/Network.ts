/**   This file handles the connection to the server */

import { useDispatch } from "react-redux";
import { Element, DataArray, ResponseType, Elements } from "./types";
import { addElement } from "../actions";
import { element } from "prop-types";

var base_url: string = "http://localhost:5000/";

export const handleLogin = (username: string, password: string) => {
  let headers = new Headers();
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Headers", "Content-Type");
  headers.append("Access-Control-Allow-Headers", "Authorization");
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  const PromiseLogin = fetch(base_url + "login", {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: params
  })
    .then(response => response.text())
    .then(responseData => {
      console.log("trying to login");
      let parsed: ResponseType = JSON.parse(responseData);
      const { message, success, data } = parsed;
      if (success) {
        localStorage.setItem("token", data);
        console.log("Successfully logged in");
      } else {
        console.log(message); //temporary
      }
      return success;
    });
  return PromiseLogin;
};

export const handleRegister = (username: string, password: string) => {
  let headers = new Headers();
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Headers", "Content-Type");
  headers.append("Access-Control-Allow-Headers", "Authorization");
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  const PromiseRegister = fetch(base_url + "register", {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: params
  })
    .then(response => response.text())
    .then(responseData => {
      console.log("trying to login");
      let parsed: ResponseType = JSON.parse(responseData);
      const { message, success } = parsed;
      return success;
    });
  return PromiseRegister;
};

export const handleLogout = () => {
  let headers = new Headers();
  let token = localStorage.getItem("token");
  headers.append("Authorization", `Basic ${btoa(`${token}:`)}`);
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Headers", "Content-Type");
  headers.append("Access-Control-Allow-Headers", "Authorization");
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const params = new URLSearchParams();
  const PromiseLogout = fetch(base_url + "logout", {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: params
  })
    .then(response => response.text())
    .then(responseData => {
      let parsed: ResponseType = JSON.parse(responseData);
      const { message, success } = parsed;
      return success;
    });
  localStorage.removeItem("token");

  return PromiseLogout;
};

export const handleProfileUpdate = (
  elements: Elements,
  backgroundImage: string
) => {
  let headers = new Headers();
  let token = localStorage.getItem("token");

  // Data builder
  let elementArray: Element[] = [];
  Object.values(elements).map(item => {
    elementArray.push(item);
  });
  let dataBuilder = { elements: elementArray, background: backgroundImage };
  //

  headers.append("Authorization", `Basic ${btoa(`${token}:`)}`);
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Headers", "Content-Type");
  headers.append("Access-Control-Allow-Headers", "Authorization");
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const data = new URLSearchParams();
  data.append("data", JSON.stringify(dataBuilder));

  // need to do error handling as well, but this "template" works!
  /** { "elements":  [{"i": "_64.3", "x": 2, "y": 3, "w": 2, "h":7, "chart": ""},  {"i": "_69", "x": 2, "y": 3, "w":5, "h":3, "chart": "MSFT"}], "background": "image.jpg"}
   * should look like this!
   */

  const PromiseProfile = fetch(base_url + "update_profile", {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: data
  })
    .then(response => response.text())
    .then(responseData => {
      console.log("Here!");
      let parsed: ResponseType = JSON.parse(responseData);
      const { message, success } = parsed;
      if (!success) {
        console.log(message);
      }
      return data;
    })
    .catch(() => {
      console.log("Failed fetching, error");
    });
  return PromiseProfile;
};

export const getProfile = (username: string) => {
  let headers = new Headers();
  let token = localStorage.getItem("token");

  headers.append("Authorization", `Basic ${btoa(`${token}:`)}`);
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Headers", "Content-Type");
  headers.append("Access-Control-Allow-Headers", "Authorization");
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const data = new URLSearchParams();
  data.append("username", username);
  // need to do error handling as well, but this "template" works!
  /** { "elements":  [{"i": "_64.3", "x": 2, "y": 3, "w": 2, "h":7, "chart": ""},  {"i": "_69", "x": 2, "y": 3, "w":5, "h":3, "chart": "MSFT"}], "background": "image.jpg"}
   * should look like this!
   */
  const PromiseProfile = fetch(base_url + "read_profile", {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: data
  })
    .then(response => response.text())
    .then(responseData => {
      console.log("Here!");
      let parsed: ResponseType = JSON.parse(responseData);
      const { message, success, data } = parsed;
      if (!success) {
        console.log(message);
      }
      return data;
    })
    .then(data => {
      //const { elements }: DataArray = JSON.parse(data);
      return JSON.parse(data);
    })
    .catch(() => {
      console.log("Failed fetching, error");
    });
  return PromiseProfile;
};

export const handlePing = () => {
  let headers = new Headers();
  let token = localStorage.getItem("token");

  headers.append("Authorization", `Basic ${btoa(`${token}:`)}`);
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Headers", "Content-Type");
  headers.append("Access-Control-Allow-Headers", "Authorization");
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const PromisePong = fetch(base_url + "ping", {
    method: "GET",
    mode: "cors",
    headers: headers
  })
    .then(response => response.text())
    .then(responseData => {
      let parsed: ResponseType = JSON.parse(responseData);
      const { message, success } = parsed;

      return success;
    })
    .catch(() => {
      console.log("Failed fetching, error");
    });
  return PromisePong;
};

export const handleSearch = (username: string) => {
  let headers = new Headers();
  let token = localStorage.getItem("token");
  console.log("Searching!");

  headers.append("Authorization", `Basic ${btoa(`${token}:`)}`);
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Headers", "Content-Type");
  headers.append("Access-Control-Allow-Headers", "Authorization");
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const data = new URLSearchParams();
  data.append("username", username);
  // need to do error handling as well, but this "template" works!
  /** { "elements":  [{"i": "_64.3", "x": 2, "y": 3, "w": 2, "h":7, "chart": ""},  {"i": "_69", "x": 2, "y": 3, "w":5, "h":3, "chart": "MSFT"}], "background": "image.jpg"}
   * should look like this!
   */
  const PromiseProfile = fetch(base_url + "read_profile", {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: data
  })
    .then(response => response.text())
    .then(responseData => {
      console.log("Here!");
      let parsed: ResponseType = JSON.parse(responseData);
      const { message, success, data } = parsed;
      if (!success) {
        console.log(message);
      }
      return data;
    })
    .then(data => {
      const { elements }: DataArray = JSON.parse(data);
      return elements;
    })
    .catch(() => {
      console.log("Failed fetching, error");
    });
  return PromiseProfile;
};