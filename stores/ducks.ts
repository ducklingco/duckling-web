import { defineStore } from 'pinia'

// define type for a duck
export interface Duck {
    id: string
    title: string
    description: string
    cover_image: {
        id: string
        path: string
        created_at: string
        updated_at: string
    }
    total_cards: number
    created_by: {
        id: string
        profile_picture: {
            id: string
            path: string
            created_at: string
            updated_at: string
        }
        first_name: string
        last_name: string
        username: string
        bio: string
        birthday: string
        register_completed_at: string
        created_at: string
        updated_at: string
    }
    latest_topics: [{
        id: string
        name: string
    }]
    published_at: string
    verified_at: string
    featured_at: string
    created_at: string
    updated_at: string
    }

export const useDucksStore = defineStore('ducks', {
  state: () => ({
    ducks: {} as Record<string, Duck>, // Map of duck ID to duck object
  }),
    actions: {
        async getDucks() {
        // Fetch ducks from the API
        const response = await fetch('/api/ducks')
        const {data: ducksList} = await response.json()
        // Add the ducks to the store
        return ducksList
        },
        addDuck(duck: any) {
        // Add a duck to the store
        this.ducks[duck.id] = duck
        },
        async fetchDuck(id: string) {
        // Fetch a single duck from the API
        const response = await fetch(`/api/ducks/${id}`)
        const {data } = await response.json()
        // Add the duck to the store
        this.addDuck(data as Duck)
        },
        async getDuck(id: string) {
            if (!this.ducks[id]) {
                // Duck not found in store, fetch it
                await this.fetchDuck(id)
            }
            // Get a duck by ID
            return this.ducks[id]
        }
    }
})