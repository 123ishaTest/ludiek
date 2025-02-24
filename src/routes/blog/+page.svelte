<script lang="ts">
  // import { formatDate } from '$lib/utils'
  // import * as config from '$lib/config'

  import { base } from '$app/paths';

  let { data } = $props();
</script>

<section>
  <ul class="posts">
    {#each data.posts as post}
      <a href="{base}/blog/{post.slug}" class="title">

        <li class="post">
          <h1>{post.title}</h1>
          <p class="description">{post.description}</p>
          <p class="date">{post.date}</p>
        </li>
      </a>

    {/each}
  </ul>
</section>

