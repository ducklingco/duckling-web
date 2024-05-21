import type { Filter } from '~/types/Filter';

export default defineEventHandler(async (event) => {
    const {filter, page} = getQuery(event)
    const ducks = await fetchDucks(filter, Number(page) || 1);
    return ducks;
})

async function fetchDucks(filter: Filter, page = 1) {
    const filterMap: { [key: string]: string } = {
        verified: 'filter[isVerified]=true',
        featured: 'filter[isFeatured]=true',
        all: '',
        '': ''
    }

    const url = `https://apiv1.duckling.co/api/v1/ducks?${filterMap[filter]}&page[number]=${page}&page[size]=6&include=coverImage,createdBy.profilePicture,latestTopics&sort=-published_at`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer 51851|Vhz7JKBxH2olMUWDE72d4n3ALG1U2wwxln2ABU2n',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('An error occurred while fetching the ducks:', error);
    }
}