import React, { Component } from 'react';
import api from '../../services/api';

class RoomAuction extends Component {

    constructor(props) {
        super(props);
        this.act_id = this.props.match.params.act_id;
        this.state = {
            data: [],
            lastPrice: 0
        }
    }

    async componentDidMount() {
        const response = await api.get(`/auction/${this.act_id}`);
        this.setState({
            data: response.data.data[0],
            lastPrice: localStorage.getItem('lastPrice')
        });
    }

    handleBet = e => {
        e.preventDefault();
        const lastPrice = document.getElementById('value');
        localStorage.setItem('lastPrice', lastPrice.value);
        this.setState({ lastPrice: lastPrice.value });
        lastPrice.value = '';

    }

    render() {
        return (
            <div>
                <div className="container pt-3">
                    <div className="container-info">
                        <h3>Information</h3>
                        <h5>Product: {this.state.data.act_room_name}</h5>
                        <h5>Price: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.state.data.act_value)}</h5>
                        <h5>Last Price: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.state.lastPrice)}</h5>
                        <h5>Remaining time: 17 min</h5>
                        <img src={`http://localhost:3333/files/${this.state.data.act_image}`} width="200" alt="Auction"></img>
                    </div>
                    <div className="container-form">
                        <form onSubmit={this.handleBet}>
                            <div className="input-group">
                                <input type="number" className="form-control" id="value"></input>

                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-success">Put value</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomAuction;