async function fetchDucks() {
    const url = 'https://apiv1.duckling.co/api/v1/ducks?filter[isFeatured]=false&page[number]=1&page[size]=6&include=coverImage,createdBy.profilePicture,latestTopics';
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

export default fetchDucks;