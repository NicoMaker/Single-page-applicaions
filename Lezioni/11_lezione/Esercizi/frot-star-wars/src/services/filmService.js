import axios from "axios";

const baseUrl = 'https://swapi.dev/api/films';

const delay = (time) => new Promise(r => {
    setTimeout(() => r(), time);
});


export async function getFilms() {
    await delay(1000);
    const res = await axios.get(baseUrl);
    return res.data.results;
}