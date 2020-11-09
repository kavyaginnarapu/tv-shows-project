import axios from 'axios';
import requestApi from '../requestApi';

export const fetchData = (type, id) => {
    let url;
    if (type === 'search') {
        url = requestApi.fetchShowsSearchData + id;
    } else if (type === 'byMovie') {
        url = requestApi.fetchShowsData + `/${id}?embed=cast`;
    } else if (type === 'bySeason') {
        url = requestApi.fetchShowsData + `/${id}/seasons`;
    }
    else {
        url = requestApi.fetchShowsData;
    }
    return axios.get(url).then(response => {
        return response.data;
    })
        .catch(error => {
            console.log(error);
        });
}
