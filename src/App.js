import React, { Component } from 'react';
import './App.css';
import Login from "./Components/Login";
import Register from "./Components/Register";
import TicketDetails from "./Components/TicketDetails";
import SampathPayment from "./Components/SampathPayment";
import DialogPayment from "./Components/DialogPayment";


import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

export default class App extends Component {

    render() {
        return (
            <div>
                <Router>
                    <Route path="/" exact strict render={() => {
                        return (<Redirect push to="/login" />);
                    }} />
                    <Route path="/homepage" exact strict render={(props) => {
                        return (<TicketDetails  {...props} />);
                    }} />
                    <Route path="/login" exact strict render={(props) => {
                        return (<Login {...props} />);
                    }} />
                    <Route path="/register" exact strict render={(props) => {
                        return (<Register {...props} />);
                    }} />
                    <Route path="/cardPayment" exact strict render={(props) => {
                        return (<SampathPayment {...props} />);
                    }} />
                    <Route path="/mobilePayment" exact strict render={(props) => {
                        return (<DialogPayment {...props} />);
                    }} />
                </Router>
            </div>
        );
    }
}