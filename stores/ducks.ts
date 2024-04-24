import { defineStore } from 'pinia'
import { useStorage, type RemovableRef } from '@vueuse/core'

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

export interface Meta {
    pagination?: {
        total: number
        count: number
        per_page: number
        current_page: number
        total_pages: number
    },
    is_fetching: boolean
}

const defaultMeta: Meta = {
    pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 0,
        total_pages: 0
    },
    is_fetching: true
}

export const useDucksStore = defineStore('ducks', {
    state: () => ({
        // ducks: useStorage('ducks', []) as RemovableRef<Duck[]>,
        ducks: {
            featured: useStorage('featured', []) as RemovableRef<Duck[]>,
            verified: useStorage('verified', []) as RemovableRef<Duck[]>,
            all: useStorage('all', []) as RemovableRef<Duck[]>
        },
        individualDucks: useStorage('individualDucks', {}) as RemovableRef<Record<string, Duck>>,
        filter: useStorage('filter', 'featured') as RemovableRef<'all' | 'verified' | 'featured'>,
        meta: {
            featured: useStorage('featuredMeta', defaultMeta) as RemovableRef<Meta>,
            verified: useStorage('verifiedMeta', defaultMeta) as RemovableRef<Meta>,
            all: useStorage('allMeta', defaultMeta) as RemovableRef<Meta>
        }
    }),
    actions: {
        async fetchDucks () {
            let shouldFetch = true
            const params = {
                filter: this.getFilter,
                page: '1'
            }
            if (this?.meta[this.filter]?.pagination) {
                const { current_page, total_pages } = this.meta[this.filter].pagination

                if (current_page && current_page < total_pages) {
                    params['page'] = String(current_page + 1)
                } else {
                    shouldFetch = false
                }
            }
            
            this.meta[this.filter].is_fetching = true
            // Fetch ducks from the API
            const response = await fetch(`/api/ducks?${new URLSearchParams(params)}`)
            const { data: ducksList, meta } = await response.json()
            // Add the ducks to the store
            this.ducks[this.filter] = [...this.ducks[this.filter], ...ducksList as Duck[]]
            this.meta[this.filter] = meta
            this.meta[this.filter].is_fetching = false
        },
        addDuck (duck: any) {
            // Add a duck to the store
            this.individualDucks[duck.id] = duck
        },
        async fetchDuck (id: string) {
            // Fetch a single duck from the API
            const response = await fetch(`/api/ducks/${id}`)
            const { data } = await response.json()
            // Add the duck to the store
            this.addDuck(data as Duck)
        },
        async getDuck (id: string) {
            if (!this.individualDucks[id])  {
                // Duck not found in store, fetch it
                await this.fetchDuck(id)
            } else {
                // Don't want to wait for the fetch to complete if the duck is already in the store. However, we can still fetch the duck in the background to update the store
                this.fetchDuck(id)
            }
            // Get a duck by ID
            return this.individualDucks[id]
        },
        fetchInitialDucks () {
            if (this.ducks[this.filter].length === 0) {
                this.fetchDucks()
            }
        },
        setFilter (filter: 'all' | 'verified' | 'featured') {
            const oldFilter = this.filter
            // Fetch new ducks if the filter has changed
            if (oldFilter !== filter) {
                // Set the filter
                this.filter = filter
                this.fetchInitialDucks()
            }

        }
    },
    getters: {
        getFilter: (state) => state.filter,
        getDucks: (state) => Object.values(state.ducks[state.filter]),
        canFetchMore: (state) => {
            const { current_page, total_pages } = state.meta[state.filter].pagination
            return current_page < total_pages
        },
        isFetching: (state) => state.meta[state.filter].is_fetching
    },
    // persist: true,
})