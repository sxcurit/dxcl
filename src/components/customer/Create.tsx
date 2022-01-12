import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    name: string,
    domain: string,
    manager_name: string,
    revenue: string,
}

export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            name: '',
            domain: '',
            manager_name: '',
            revenue: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });

        const formData = {
            name: this.state.name,
            domain: this.state.domain,
            manager_name: this.state.manager_name,
            revenue: this.state.revenue,
        }

        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });

        axios.post(`http://localhost:5000/clients`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> DX CLIENT MANAGEMENT </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Enter Client Details
                    </div>
                    )}

                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Client is successfully added to db !
                            </div>
                    )}

                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="name"> Client Name </label>
                            <input type="text" id="name" onChange={(e) => this.handleInputChanges(e)} name="name" className="form-control" placeholder="Enter client name" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="domain"> Domain </label>
                            <input type="text" id="domain" onChange={(e) => this.handleInputChanges(e)} name="domain" className="form-control" placeholder="Enter client domain" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="manager_name"> Manager Name </label>
                            <input type="text" id="manager_name" onChange={(e) => this.handleInputChanges(e)} name="manager_name" className="form-control" placeholder="Enter manager name" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="revenue"> Revenue </label>
                            <input type="text" id="revenue" onChange={(e) => this.handleInputChanges(e)} name="revenue" className="form-control" placeholder="Enter revenue" />
                        </div>

                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                ADD CLIENT
              </button>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Create)