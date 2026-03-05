import { createApp, h } from "vue";
import { createRouter, createWebHashHistory, RouterView } from "vue-router";

import Home from "./views/Home.vue.js";
import Post from "./views/Post.vue.js";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/post/:slug", component: Post, props: true },
  ],
});

const App = {
  render() {
    return h("div", { class: "spa-shell" }, [
      h("p", { style: "opacity:.7" }, `Mounted. Route: ${this.$route.fullPath}`),
      h(RouterView),
    ]);
  },
};

createApp(App).use(router).mount("#app");