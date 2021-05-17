import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";
import Pinia from "./stores";

import "virtual:windi.css";
import "./assets/global.css";

createApp(App).use(Pinia).use(Router).mount("#app");
