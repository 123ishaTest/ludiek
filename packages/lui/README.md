# Lui

> Ludiek UI is a utility library providing Svelte Components to gain insight in your game

## Usage

The most important component is the `<LuiContext>`, every other Lui Component should be used within a `<LuiContext>`.

```html
<script lang="ts">
  import { page } from '$app/state';

  // Make sure the content is loaded before creating the context.
  engine.contentManager.load(page.data.content);
</script>

<LuiContext {engine}>
  <!-- It is nice if this has the biggest size as possible  -->
  <div class="h-screen">
    <!-- Your game goes here -->
  </div>
</LuiContext>
```

Now press `` ` `` (or one of your provided `toggleKeys`) to enjoy Lui's debug tools!

### Notable components

<LuiContentHint {id} {kind}>
