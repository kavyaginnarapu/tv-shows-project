const BASE_URL = 'https://api.tvmaze.com/'
export default{
    fetchShowsData : BASE_URL+'shows',
    fetchShowsSearchData: BASE_URL+`search/shows?q=`,
    fetchEpisodeData : BASE_URL+`shows/1/episodes?specials=`,
}