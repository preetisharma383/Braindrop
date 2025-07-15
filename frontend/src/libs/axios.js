import axios from "axios";
//in production there is no localhost so make it dynamic
const baseURL=import.meta.env.MODE === "development"?"http://localhost:3000/api":"/api"
const api=axios.create({
    baseURL:baseURL,
})
export default api;