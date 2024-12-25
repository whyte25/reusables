// import { env } from "@/env";
// import { handleAuth } from "@/hooks/use-auth";
// import axios from "axios";
// import NProgress from "nprogress";
// import { toast } from "sonner";

// const instance = axios.create({
//   baseURL: env.NEXT_PUBLIC_API_BASE_URL,
//   timeout: 30000,
// });

// const { handleLogout } = handleAuth();

// instance.interceptors.response.use(
//   (response) => {
//     NProgress.done();

//     return response;
//   },
//   (error) => {
//     NProgress.done();
//     if (error.code === "ERR_NETWORK" && error?.response?.status !== 503) {
//       // handleSetNetworkError(true);
//       toast.error(error?.message);
//       return error;
//     }

//     if (
//       error?.response?.status === 401 &&
//       error?.response?.statusText === "Unauthorized"
//     ) {
//       toast.error("Authorized. Please sign in.");
//       // handleLogout();
//     }

//     if (
//       error?.response?.status === 401 &&
//       error?.config &&
//       !error?.config.__isRetryRequest
//     ) {
//       if (
//         error?.response?.data?.message ===
//           "Authentication failed. Please sign in." ||
//         error?.response?.data?.message ===
//           "Authentication failed. Please sign in."
//       ) {
//         // toast.error("Authentication failed. Please sign in.");
//         // handleLogout();
//       }
//     }
//     if (error.message.includes("ERR_CONNECTION_REFUSED")) {
//       toast.error("Failed to connect to the server: Connection refused");
//     }
//     if (error?.response?.status === 503 && error.code === "ERR_NETWORK") {
//       error.response.data.message = "Something went wrong, Please try again!";
//       toast.error(error.response.data.message);
//     }
//     return Promise.reject(error);
//   },
// );

// export default instance;
