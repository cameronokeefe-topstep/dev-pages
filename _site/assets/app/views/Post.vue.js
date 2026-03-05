import { ref, onMounted, watch } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { getPostBySlug } from "../lib/api.js";

export default {
  components: { RouterLink },
  props: { slug: String },
  setup(props) {
    const route = useRoute();
    const post = ref(null);
    const error = ref(null);

    async function load() {
      error.value = null;
      const slug = props.slug ?? route.params.slug;
      const found = await getPostBySlug(slug);

      if (!found) {
        post.value = null;
        error.value = `Post not found: ${slug}`;
        return;
      }

      post.value = found;
    }

    onMounted(load);
    watch(() => route.params.slug, load);

    return { post, error };
  },
  template: `
    <article>
      <p><RouterLink to="/">← All docs</RouterLink></p>

      <p v-if="error" style="color:red">{{ error }}</p>

      <div v-else-if="post">
        <h1>{{ post.title }}</h1>
        <p><small>{{ new Date(post.date).toLocaleString() }}</small></p>

        <!-- Jekyll already rendered markdown -> HTML -->
        <div v-html="post.content"></div>

        <hr />
        <p>Static version: <a :href="post.url">{{ post.url }}</a></p>
      </div>

      <p v-else>Loading…</p>
    </article>
  `,
};