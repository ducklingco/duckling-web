<template>
  <header class="overview-header relative w-full">
    <!-- Small screens -->
    <div
      class="flex w-full flex-col justify-between gap-4 sm:hidden md:gap-10 lg:flex-row lg:items-center"
    >
      <a href="https://www.duckling.co/">
        <img
          class="m-auto w-32 md:w-56"
          src="~/assets/img/duckling_logo_text_right.png"
          alt="duckling logo with text"
        />
      </a>
      <div class="flex items-center">
        <h1 class="text-lg font-semibold leading-7 md:text-2xl">
          Duckling is documentary stories created by the next generation of
          journalists and storytellers.
        </h1>
      </div>
    </div>
    <!-- Large screens -->
    <div id="grid" class="relative hidden w-full grid-cols-2 sm:grid">
      <div class="w-full">
        <h1 class="text-lg font-semibold leading-9 md:text-2xl">
          Duckling is documentary stories created by the next generation of
          journalists and storytellers.
        </h1>
      </div>
      <div class="flex w-full justify-end">
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
