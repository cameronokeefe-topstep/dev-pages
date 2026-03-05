import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { getPosts } from "../lib/api.js";

export default {
  components: { RouterLink },
  setup() {
    const posts = ref([]);
    const error = ref(null);

    onMounted(async () => {
      try {
        posts.value = await getPosts();
      } catch (e) {
        error.value = e.message || String(e);
      }
    });

    return { posts, error };
  },
  template: `
    <section>
      <h1>Docs (SPA)</h1>
      <p>SPA routes: <code>/dev-pages/app/#/post/&lt;slug&gt;</code></p>

      <p v-if="error" style="color:red">{{ error }}</p>

      <ul v-else>
        <li v-for="p in posts" :key="p.slug">
          <RouterLink :to="'/post/' + p.slug">{{ p.title }}</RouterLink>
          <small> — static: <a :href="p.url">{{ p.url }}</a></small>
        </li>
      </ul>
    </section>
  `,
};