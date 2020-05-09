import React, { Component } from 'react';
import api from '../../services/api';
import { RiAuctionLine } from 'react-icons/ri';
import './styles.css';

class NewAuction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            act_image: ''
        };
    }
    
    handleImage = e => {
        this.setState({ act_image: e.target.files[0] });
    }

    handleAuction = async e => {
        e.preventDefault();

        const act_room_name = document.getElementById('act_room_name').value;
        const act_username = document.getElementById('act_username').value;
        const act_email = document.getElementById('act_email').value;
        const act_value = document.getElementById('act_value').value;

        try {
            const data = new FormData();

            data.append('act_room_name', act_room_name);
            data.append('act_username', act_username);
            data.append('act_email', act_email);
            data.append('act_value', act_value);
            data.append('act_image', this.state.act_image);

            await api.post('/auction', data);

            this.props.history.push('/');
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div>
                <div className="container col-md-3 auction-form">
                    <div className="title">
                        <h3>New Auction <RiAuctionLine size={30} /></h3>
                    </div>
                    <form onSubmit={this.handleAuction}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" id="act_username" value={localStorage.getItem('username')} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" id="act_email" value={localStorage.getItem('email')} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Product</label>
                            <input type="text" className="form-control" id="act_room_name" required />
                        </div>
                        <div className="form-group">
                            <label>Value</label>
                            <input type="number" className="form-control" id="act_value" placeholder="Enter a value" required />
                        </div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="act_image" onChange={this.handleImage} />
                            <label className="custom-file-label">Choose product</label>
                        </div>
                        <div className="pt-3">
                            <button type="submit" className="btn btn-primary">Publish</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewAuction;
