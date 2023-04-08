import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { createApp } from "vue";
import App from "./App";
import router from "./router/index.js";

createApp(App).use(router).mount("#app");
