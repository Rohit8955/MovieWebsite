import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDc3MDUyYmNlY2QzOWQ2OGE0YzhjN2U2NzczMzY2YiIsInN1YiI6IjY1OWQ0ODEyN2ZjYWIzMDBmMDU1N2MxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z65A2y10YbFXSlCh5A2npaSgbayslrqLM12jsLiCFNw"

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const  fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};