// export const base_url = "http://localhost:5000/api/";

let base_url;

if (process.env.NODE_ENV === "development") {
    base_url = "http://localhost:5000/api/";
} else {
    base_url = "https://salinaka-ecommerce-backend.onrender.com/api/";
}

export { base_url };