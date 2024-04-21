import { defineStore } from 'pinia'
import { useLocalStorage, useStorage, type RemovableRef } from '@vueuse/core'

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
        ducks: useStorage('ducks', []) as RemovableRef<Duck[]>,
        // ducks: [] as Duck[],
        // individualducks: {} as Record<string, Duck>, // Map of duck ID to duck object

        individualDucks: useStorage('individualDucks', {}) as RemovableRef<Record<string, Duck>>,
        filter: useStorage('filter', 'featured').value,

        // filter: 'featured' as 'all' | 'verified' | 'featured'
    }),
    actions: {
        async fetchDucks() {
            // Fetch ducks from the API
            const response = await fetch(`/api/ducks?filter=${this.getFilter}`, {method: 'GET'})
            
            console.log(response)
            const {data: ducksList} = await response.json()
            // Add the ducks to the store
            this.ducks = ducksList as Duck[]
        },
        addDuck(duck: any) {
            // Add a duck to the store
            this.individualDucks[duck.id] = duck
        },
        async fetchDuck(id: string) {
            // Fetch a single duck from the API
            const response = await fetch(`/api/ducks/${id}`)
            const {data } = await response.json()
            // Add the duck to the store
            this.addDuck(data as Duck)
        },
        async getDuck(id: string) {
            if (!this.individualDucks[id]) {
                // Duck not found in store, fetch it
                await this.fetchDuck(id)
            }
            // Get a duck by ID
            return this.individualDucks[id]
        },
        setFilter(filter: 'all' | 'verified' | 'featured') {
            const oldFilter = this.filter
            // Set the filter
            this.filter = filter
            // Fetch new ducks if the filter has changed
            if (oldFilter !== filter) {
                this.fetchDucks()
            }
            
        }
    },
    getters: {
        getFilter: (state) => state.filter,
        getDucks: (state) => Object.values(state.ducks),
    },
    // persist: true,
})