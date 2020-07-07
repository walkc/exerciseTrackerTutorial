import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateUser extends Component{
    constructor(props) {
        super (props);
        //bind our form methods
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);



        //these should correspond to the stuff in the mongodb db!
        this.state = {
            username : '',
            description : '',
            duration : 0,
            date: new Date(),
            //execpt this one, where we'll hold our users so we can have dropdown menu to show users
            users : []
        }
    }

    //this gets called right before things load on the page
    //we want to get the users from the db to set our users array state so we can have our dropdown menu
    componentDidMount(){
        axios.get("http://localhost:5000/users")
            //take the response
            .then(response => {
                //check if there are any users in the response
                if (response.data.length > 0){
                    this.setState({
                        //return a map of users' usernames! so go through and grab only username from the users
                        users : response.data.map(user => user.username),
                        //set the default username showing in drop down to the first one in the db
                        username : response.data[0].username
                    })
                }
            })
    }

    //methods to handle form
        onChangeUsername(e) {
            this.setState({
                //set the username to the value of the textbox
                username : e.target.value
            });
        }

        onChangeDescription(e) {
            this.setState({
                //set the username to the value of the textbox
                description : e.target.value
            });
        }

        onChangeDuration(e) {
            this.setState({
                //set the username to the value of the textbox
                duration : e.target.value
            });
        }

        //this is a little different bc not doing text box, doing a calendar
        onChangeDate(date) {
            this.setState({
                //set the username to the value of the textbox
                date : date
            });
        }

        onSubmit(e){
            //overrides default html submit behavior 
            e.preventDefault();
            //grab the values from the state
            const exercise = {
                username : this.state.username,
                description : this.state.description,
                duration : this.state.duration,
                date : this.state.date
            }
            //this is where we'll connect our frontend with our backend
            console.log(exercise);
            axios.post("http://localhost:5000/exercises/add", exercise)
                //then log the response to the console
                .then(res => console.log(res.data));
            window.location = '/';
        }

    //here, we return our form code!
    render(){
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Username: </label>
                        <select ref = "userInput"
                            required
                            className="form-control"
                            value = {this.state.username}
                            onChange = {this.onChangeUsername}>
                                { 
                                    this.state.users.map(function(user){
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                        </option>;
                                    })
                                }
                            </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>  
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />      
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                     <div className="form-group">
                         <input type="submit" value="Create Exercise Log" className="btn btn-primary" />       
                    </div>   
                   
                </form>
            </div>
        )
    }
}


