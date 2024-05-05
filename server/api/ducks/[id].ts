export default defineEventHandler(async (event: any) => {
  const id = event.context.params.id

  // Do what you need to do with the id
  // e.g.
  
    // Fetch a single duck from the API
    // https://apiv1.duckling.co/api/v1/ducks/duck_2dP1paWf37QAEJ0fxe7A1eoiOQZ/cards

    // Fetch a single duck from the API
    const url = `https://apiv1.duckling.co/api/v1/ducks/${id}`;

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

    
  return id
});