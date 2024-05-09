<template>
  <header class="relative w-full overview-header">
    <!-- Small screens -->
    <div class="flex flex-col justify-between w-full sm:hidden lg:flex-row lg:items-center gap-4 md:gap-10">
      <a href="https://www.duckling.co/">
        <img
class="w-32 md:w-56 m-auto" src="~/assets/img/duckling_logo_text_right.png"
          alt="duckling logo with text" >
      </a>
      <div class="flex items-center">
        <h1 class="text-lg md:text-2xl font-bold leading-7">
          Duckling is documentary stories created by the next generation of
          journalists and storytellers.
        </h1>
      </div>
    </div>
    <!-- Large screens -->
    <div id="grid" class="relative hidden w-full sm:grid grid-cols-2">
      <div class="w-full">
        <h1 class="text-lg md:text-2xl font-bold leading-9">
          Duckling is documentary stories created by the next generation of
          journalists and storytellers.
        </h1>
      </div>
      <div class="flex justify-end w-full">
        <a href="https://www.duckling.co/">
          <img
class="object-contain w-56" src="~/assets/img/duckling_logo_text_right.png"
            alt="duckling logo with text" >
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>
