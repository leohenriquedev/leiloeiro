import React from 'react';
import ReactNotification, { store } from 'react-notifications-component';
// import socketOn from '../../services/socket';

import { FiLogOut } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import './styles.css';

export default function Header({ Link, useHistory }) {

    const history = useHistory();
    const username = localStorage.getItem('username');
    
    function handleLogout() {
        store.addNotification({
            title: 'Logged Out',
            message: 'You have logged out from this session!',
            type: 'danger',
            container: 'top-right',
            insert: 'top',
            dismiss: {
                duration: 500
            },
            onRemoval: () => {
                localStorage.clear();
                history.push('/login');
            }
        });
    }

    // socketOn('newBet', message => {
    //     const data = message.data[0];
    //     store.addNotification({
    //         title: 'New Bet',
    //         message: `New Bet from ${data.act_username} by value ${data.act_value}`,
    //         type: 'success',
    //         container: 'top-right',
    //         insert: 'top',
    //         dismiss: {
    //             duration: 3000
    //         }
    //     });
    // });

    return (
        <div>
            <div className="nav-style">
                <nav className="navbar navbar-light bg-light">

                    <div>
                        <Link className="navbar-brand" to="/auction/new">
                            <AiOutlinePlus size={30} />
                        </Link>
                    </div>

                    <div>
                        <h6> Welcome, {username}</h6>
                    </div>

                    <div className="row">
                        <div>
                            <button
                                onClick={handleLogout}
                                className="btn btn-danger">
                                <FiLogOut size={16} />
                            </button>
                        </div>
                    </div>

                </nav>
            </div>
            <ReactNotification />
        </div>
    );
}