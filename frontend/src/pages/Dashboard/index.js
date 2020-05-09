import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import socketOn from '../../services/socket';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feed: []
        };
    }

    async componentDidMount() {
        const response = await api.get('/auction');
        this.setState({ feed: response.data.data });

        socketOn('newAuction', newAuction => {
            this.setState({
                feed: [newAuction.data[0], ...this.state.feed],
            });
        });
    }

    render() {
        return (
            <div>
                <div className="container col-md-6 cards-style">
                    <div className="row">
                        {this.state.feed.map(auction => (
                            <div key={auction.act_id} className="card col-md-4">
                                <img src={`http://localhost:3333/files/${auction.act_image}`} className="card-img-top" alt="..."></img>
                                <div className="card-body">
                                    <h5 className="card-title">{auction.act_room_name} - {auction.act_username}</h5>
                                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(auction.act_value)}
                                </div>
                                <div className="card-footer bg-transparent">
                                    <Link to={`/auction/room/${auction.act_id}`} className="btn btn-primary">Join to Auction</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;