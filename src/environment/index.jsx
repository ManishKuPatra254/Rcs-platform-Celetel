/* eslint-disable no-undef */

// For Staging setup -- Staging Host

const staging = {
  apiUrl: "http://localhost:",
  encryptionkey: "",
  PORT: '8600/api',
  API_BASEURL: "https://main-rcs.vercel.app",
  SOCKET_URL: "ws://localhost:8600"
};

// For Production server --

const production = {
  apiUrl: "",
  encryptionkey: "",
  PORT: '8600/api',
  API_BASEURL: "http://157.15.202.251/api-docs/",
  // API_BASEURL: "http://3.111.149.149:8600",
  SOCKET_URL: ""
};

console.log("process.env.REACT_APP_ENV :", process.env.REACT_APP_ENV);

if (process.env.REACT_APP_ENV === "staging") {
  module.exports = staging;
}
else if (process.env.REACT_APP_ENV === "production") {
  module.exports = production;
}
else {
  // Handle the case when REACT_APP_ENV is neither "staging" nor "production"
  console.error("Invalid REACT_APP_ENV:", process.env.REACT_APP_ENV);
}
