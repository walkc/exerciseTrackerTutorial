import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component{
    constructor(props) {
        super (props);
        //bind our form methods
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username : '',
        }
    }

    //methods to handle form
    onChangeUsername(e) {
        this.setState({
            //set the username to the value of the textbox
            username : e.target.value
        });
    }

    onSubmit(e){
        //overrides default html submit behavior 
        e.preventDefault();
        //grab the values from the state
        const user = {
            username : this.state.username,
        }
        //this is where we'll connect our frontend with our backend!!
        console.log(user);
        //our route is expected a post request to users/add with the username in the body of the request
        //so we send user to this address
        axios.post('http://localhost:5000/users/add', user)
            //after its posted, log the result
            .then(res => console.log(res.data));


        //set username back to blank so they can submit another one
        this.setState({
            username: ''
        });
    }
    

    
    
    render(){
        return (
            <div>
                <h3>Create new user</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUsername} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}