import React from 'react';
import VotingService from '../services/VotingService';

class VotingComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            animals:[]
        }
        this.postVote.bind(this);
    }

    async componentDidMount() {
        await VotingService.getResults()
            .then(response => {
                const dogCounter = response.data.filter(item => item.type === 'dog').length;
                const catCounter = response.data.filter(item => item.type === 'cat').length;
                console.log(response.data);
                this.setState({animals: response.data, dogCounter, catCounter})
        });
    }

    async postVote(e) {
        //e.preventDefault();
        await VotingService.postVote({type: e.target.elements.type.value})
            .then(response => {this.setState({animals: response.data})})
            .catch(error => {console.log(error)});
    }

    render (){
        return (
            <div>
                <h1 className="text-center">Voting Results</h1>
                    <table className="table table-striped">
                        <thead className="bg-secondary">
                            <tr className="text-white font-weight-bold">
                                <td>Vote Id</td>
                                <td>Animal type</td>
                            </tr>
                        </thead>
                    </table>
                    <div className="limited-height overflow-auto">
                        <table className="table table-striped">
                            <tbody>
                                {
                                    this.state.animals.map(
                                        data =>
                                        <tr key={data.id}>
                                            <td>{data.id}</td>
                                            <td>{data.type}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2 className="text-primary">Dogs</h2>
                            {this.state.dogCounter}
                        </div>
                        <div className="col">
                            <h2 className="text-danger">Cats</h2>
                            {this.state.catCounter}
                        </div>
                    </div>
                </div>
                <div>
                    <form onSubmit={this.postVote}>
                        <label>
                            Animal:
                            <input type="text" name="type" />
                        </label>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default VotingComponent;