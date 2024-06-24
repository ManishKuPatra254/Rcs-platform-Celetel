
const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  encryptionKey: import.meta.env.VITE_ENCRYPTION_KEY,
  port: import.meta.env.VITE_PORT,
  socketUrl: import.meta.env.VITE_SOCKET_URL,
};

// console.log("All Env Variables:", import.meta.env);
// console.log("Configuration:", config);

if (!import.meta.env.PROD) {
  // console.log("Invalid environment for production:", import.meta.env.MODE);
}

export default config;
