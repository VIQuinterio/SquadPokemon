import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/' //'https://api.pokemontcg.io/v2/cards'
});


export default api;