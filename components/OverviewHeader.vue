<template>
  <header class="relative overview-header w-full">
    <!-- Small screens -->
    <div
      class="flex sm:hidden justify-between w-full lg:flex-row lg:items-center flex-col gap-10"
    >
      <a href="https://www.duckling.co/">
        <img
          class="w-56 m-auto"
          src="~/assets/img/duckling_logo_text_right.png"
          alt="duckling logo with text"
        />
      </a>
      <div class="flex items-center">
        <h1 class="text-2xl font-bold leading-9">
          Duckling is documentary stories created by the next generation of
          journalists and storytellers.
          <a href="https://www.duckling.co/" class="text-green"> Learn more</a>
        </h1>
      </div>
    </div>
    <!-- Large screens -->
    <div id="grid" class="hidden relative sm:grid grid-cols-2 w-full">
      <div class="w-full">
        <h1 class="text-2xl font-bold leading-9">
          Duckling is documentary stories created by the next generation of
          journalists and storytellers.
          <a href="https://www.duckling.co/" class="text-green"> Learn more</a>
        </h1>
      </div>
      <div class="w-full flex justify-end">
        <a href="https://www.duckling.co/">
          <img
            class="w-56 object-contain"
            src="~/assets/img/duckling_logo_text_right.png"
            alt="duckling logo with text"
          />
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>
