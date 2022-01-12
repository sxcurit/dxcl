import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';


interface IState {
    clients: any[];
}

export default class Clients extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { clients: [] }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:3000/clients`).then(data => {
            this.setState({ clients: data.data })
        })
    }

    public deleteClient(id: number) {
        axios.delete(`http://localhost:3000/clients/${id}`).then(data => {
            const index = this.state.clients.findIndex(clients => clients.id === id);
            this.state.clients.splice(index, 1);
            this.props.history.push('/');
        })
    }

    public render() {
        const clients = this.state.clients;
        return (
            <div>
                {clients.length === 0 && (
                    <div className="text-center">
                        <h2>Client Data Not Available</h2>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Domain</th>
                                    <th scope="col">Manager</th>
                                    <th scope="col">Revenue</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients && clients.map(clients =>
                                    <tr key={clients.id}>
                                        <td>{clients.name}</td>
                                        <td>{clients.domain}</td>
                                        <td>{clients.manager_name}</td>
                                        <td>{clients.revenue}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${clients.id}`} className="btn btn-sm btn-outline-secondary">Edit Client </Link>
                                                    <Link to={`addclients`} className="btn btn-sm btn-outline-secondary">Add Client </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteClient(clients.id)}>Delete Client</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}
