import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { onUnhandledRequest } from "msw/lib/core/utils/request/onUnhandledRequest";
// async function enableMocking() {
//   if (process.env.NODE_ENV !== "development") {
//     return;
//   }

//   const { worker } = await import("./mocks/browser");

//   // `worker.start()` returns a Promise that resolves
//   // once the Service Worker is up and ready to intercept requests.
//   return worker.start();
// }

// enableMocking().then(() => {
//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// });
// if (process.env.NODE_ENV === "development") {
//   const { worker } = require("./mocks/browser");
//   worker.start();
//   console.log(worker);
// }
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest(request, print) {
      // Ignore any requests containing "cdn.com" in their URL.
      // if (request.url.includes('cdn.com')) {
      //   return
      // }
      return;
      // Otherwise, print an unhandled request warning.
      // print.warning()
    },
  });
}

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
