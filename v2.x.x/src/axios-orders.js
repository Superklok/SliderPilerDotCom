import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://sliderpilerdotcom-default-rtdb.firebaseio.com/'
});

export default instance;