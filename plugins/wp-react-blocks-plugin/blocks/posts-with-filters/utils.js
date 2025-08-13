import apiFetch from '@wordpress/api-fetch';

export const get = (url, _params = {}) => {
    return new Promise((resolve, reject) => {

        apiFetch(url, {
            method: 'GET',
        })
            .then(
                function (response) {
                    if (response.status !== 200) {
                        reject(response)
                    }
                    response.json().then(function (data) {
                        const meta = {}
                        response.headers.forEach((header, name) => {
                            meta[name] = header

                        })

                        resolve({data, meta})
                    })
                }
            )
            .catch(function (err) {
                reject(err)
            })
    })
}

export const fetchAllCategories = async () => {
    const categories = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        try {
            const response = await apiFetch({
                path: `/wp/v2/categories?per_page=100&page=${page}`,
                method: 'GET',
            });

            categories.push(...response);

            // Check if there are more pages by examining the X-WP-TotalPages header
            // Since apiFetch doesn't expose headers in the response, we'll check the response length
            hasMore = response.length === 100; // If we get 100 items, there might be more
            page++;
        } catch (error) {
            console.error('Error fetching categories:', error);
            break;
        }
    }
    return categories;
}