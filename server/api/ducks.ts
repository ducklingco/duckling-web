

// Filter should be of type: verified, featured or all

// Create type / interface

type Filter = 'verified' | 'featured' | 'all';




export default defineEventHandler(async (event) => {
    const {filter} = getQuery(event)
    console.log('event:', event)
    console.log('filter:', filter)

    const ducks = await fetchDucks(filter);
    return ducks;
})


async function fetchDucks(filter: string | undefined) {

    const filterMap: { [key: string]: string } = {
        verified: 'filter[isVerified]=true',
        featured: 'filter[isFeatured]=true',
        all: '',
        '': ''
    }

    const url = `https://apiv1.duckling.co/api/v1/ducks?${filterMap[filter]}&page[number]=1&page[size]=6&include=coverImage,createdBy.profilePicture,latestTopics`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer 1387|w0TPGTeadqVVU2ZN8thMZCLJAaqTFVMRPu2ug9Oa',
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

// export default fetchDucks;