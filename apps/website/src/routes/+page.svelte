<script lang="ts">
  import { resolve } from '$app/paths';
</script>

<div class="flex h-full w-full flex-col items-center p-8">
  <div class="flex flex-col items-center justify-center">
    <img src="/favicon.png" class="pixelated h-48 w-48" alt="Ludiek Logo" />
  </div>

  <div class="flex-w flex justify-center">
    <div class="m-20 flex w-full flex-col">
      <h1 class="text-primary text-8xl">Ludiek</h1>
      <p class="text-3xl">The game engine that focuses on the fun!</p>

      <a href="{resolve('/docs')}">
        <button class="btn btn-primary mt-4 w-24">Explore!</button>
      </a>
    </div>
  </div>

  <div class="flex flex-col space-y-4 md:flex-row md:flex-wrap md:space-x-12">
    <div class="card card-border bg-base-300 h-36 flex-1">
      <div class="card-body">
        <h2 class="card-title text-primary">Jam-packed with functionality</h2>
        <p>Gets you up and running for game jams instantly!</p>
      </div>
    </div>

    <div class="card card-border bg-base-300 h-36 flex-1">
      <div class="card-body">
        <h2 class="card-title text-primary">Free-form</h2>
        <p>Requires minimal structure so you can organize your game however you like!</p>
      </div>
    </div>

    <div class="card card-border bg-base-300 h-36 flex-1">
      <div class="card-body">
        <h2 class="card-title text-primary">Batteries included</h2>
        <p>Comes with state management, content parsing*, and balancing simulators* built in the engine!</p>
        <a class="link" href="https://github.com/123ishaTest/ludiek/issues/1" target="_blank">*Soon</a>
      </div>
    </div>
  </div>
</div>
