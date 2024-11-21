import { defineStore } from "pinia";
import { useStorage, type RemovableRef } from "@vueuse/core";
import type { Duck, DuckDetailed } from "~/types/Duck";
import type Meta from "~/types/Meta";

const defaultMeta: Meta = {
  pagination: {
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 0,
    total_pages: 0,
  },
  is_fetching: true,
};

export const useDucksStore = defineStore("ducks", {
  state: () => ({
    // ducks: useStorage('ducks', []) as RemovableRef<Duck[]>,
    ducks: {
      featured: useStorage("featured", []) as RemovableRef<Duck[]>,
      verified: useStorage("verified", []) as RemovableRef<Duck[]>,
      all: useStorage("all", []) as RemovableRef<Duck[]>,
    },
    individualDucks: useStorage("individualDucks", {}) as RemovableRef<
      Record<string, Duck>
    >,
    filter: useStorage("filter", "featured") as RemovableRef<
      "all" | "verified" | "featured"
    >,
    meta: {
      featured: useStorage("featuredMeta", {
        ...defaultMeta,
      }) as RemovableRef<Meta>,
      verified: useStorage("verifiedMeta", {
        ...defaultMeta,
      }) as RemovableRef<Meta>,
      all: useStorage("allMeta", { ...defaultMeta }) as RemovableRef<Meta>,
    },
  }),
  actions: {
    async fetchDucks(accessToken: string) {
      const params = {
        filter: this.filter,
        page: "1",
        accessToken,
      };
      if (this?.meta[this.filter]?.pagination) {
        const { current_page, total_pages } =
          this.meta[this.filter].pagination!;

        if (current_page && current_page < total_pages) {
          params["page"] = String(current_page + 1);
        }
      }

      this.meta[this.filter].is_fetching = true;
      // Fetch ducks from the API
      const { data, meta } = await $fetch(
        `/api/ducks?${new URLSearchParams(params)}`,
      );
      // Add the ducks to the store
      this.ducks[this.filter] = [
        ...this.ducks[this.filter],
        ...(data as Duck[]),
      ];

      this.meta[this.filter].pagination = meta;
      this.meta[this.filter].is_fetching = false;
    },
    addDuck(duck: Duck) {
      // Add a duck to the store
      this.individualDucks[duck.id] = duck;
    },
    async fetchDuck(id: string) {
      // Fetch a single duck from the API
      const { data } = await $fetch(`/api/ducks/${id}`);
      // Add the duck to the store
      this.addDuck(data as Duck);
    },
    async getDuck(id: string): Promise<DuckDetailed> {
      if (!this.individualDucks[id]) {
        // Duck not found in store, fetch it
        await this.fetchDuck(id);
      } else {
        // Don't want to wait for the fetch to complete if the duck is already in the store. However, we can still fetch the duck in the background to update the store
        this.fetchDuck(id);
      }
      // Get a duck by ID
      const detailedDuck: DuckDetailed = {
        ...this.individualDucks[id],
      };
      return detailedDuck;
    },
    fetchInitialDucks(accessToken: string) {
      if (this.ducks[this.filter].length === 0) {
        this.fetchDucks(accessToken);
      }
    },
    setFilter(filter: "all" | "verified" | "featured", accessToken: string) {
      const oldFilter = this.filter;
      // Fetch new ducks if the filter has changed
      if (oldFilter !== filter) {
        // Set the filter
        this.filter = filter;
        this.fetchInitialDucks(accessToken);
      }
    },
  },
  getters: {
    getFilter: (state) => state.filter,
    getDucks: (state) => Object.values(state.ducks[state.filter]),
    canFetchMore: (state) => {
      if (!state?.meta[state.filter]?.pagination) return false;
      const { current_page, total_pages } =
        state.meta[state.filter].pagination!;
      return current_page < total_pages;
    },
    isFetching: (state) => state.meta[state.filter].is_fetching,
  },
});
