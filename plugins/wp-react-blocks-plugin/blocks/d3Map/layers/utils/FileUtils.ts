import { Media } from '@dg-data-viz/wp-commons';
import apiFetch from '@wordpress/api-fetch';

export const getJsonFiles = () => {
    return apiFetch<Media[]>({path: '/wp/v2/media?per_page=100&mime_type=application/json'});
}

export default {
    getJsonFiles
}