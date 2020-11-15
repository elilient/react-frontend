import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/api/voting';

class VotingService {

    getResults() {
        return axios.get(REST_API_URL);
    }

    postVote(values) {
        return axios.post(REST_API_URL, values);
    }
}

export default new VotingService();