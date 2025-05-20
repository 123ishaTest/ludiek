<script lang="ts">
  import { base } from '$app/paths';
</script>

<div class="flex h-full w-full flex-col items-center p-8">
  <div class="border-primary flex h-64 w-64 flex-col items-center justify-center border-2">
    <p>Logo goes here</p>
  </div>

  <div class="flex-w flex justify-center">
    <div class="m-20 flex w-full flex-col">
      <h1 class="text-primary text-8xl">Ludiek</h1>
      <p class="text-3xl">The game engine that focuses on the fun!</p>

      <a href="{base}/docs">
        <button class="btn btn-primary mt-4 w-24">Explore!</button>
      </a>
    </div>
  </div>

  <div class="flex flex-col space-y-4 md:flex-row md:flex-wrap md:space-x-12">
    <div class="card card-border bg-base-300 h-36 flex-1">
      <div class="card-body">
        <h2 class="card-title text-primary">Jam-packed with features</h2>
        <p>Gets you up and running for game jams instantly!</p>
      </div>
    </div>

    <div class="card card-border bg-base-300 h-36 flex-1">
      <div class="card-body">
        <h2 class="card-title text-primary">Opinionated</h2>
        <p>Provides structure so you can focus on game design!</p>
      </div>
    </div>

    <div class="card card-border bg-base-300 h-36 flex-1">
      <div class="card-body">
        <h2 class="card-title text-primary">Batteries included</h2>
        <p>Comes with state management, content parsing, and balancing simulators built in the engine!</p>
      </div>
    </div>
  </div>
</div>
