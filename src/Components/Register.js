import React, { Component } from 'react';
import './Components.css'
import { Input, Button, Form, Container, Col } from 'reactstrap';
import Row from "reactstrap/es/Row";
import logo from '../Assets/tickets.png';


export default class Register extends Component {

    constructor(props){
        super(props);
        this.state={
            fName:"",
            lName:"",
            username:"",
            password:"",
            nic:"",
            email:"",
            redirect: false
        }
    }

    registerOnClick = () => {
        if (this.state.fName === "" || this.state.lName === "" || this.state.username === "" || this.state.password === "" || this.state.nic === "" || this.state.email === "") {
            alert("Please fill all the fields")
        } else {
            let body = JSON.stringify({
                fName: this.state.fName,
                lName: this.state.lName,
                username: this.state.username,
                password: this.state.password,
                nic: this.state.nic,
                email: this.state.email
            });

            fetch("http://localhost:3001/user/signUp",{
                method: 'POST',
                body: body,
                headers:{'Content-Type': 'application/json'}
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    if (res.status === 500) {
                        throw new Error("Account with this username already exist")
                    } else {
                        throw new Error("Having Problems registering")
                    }
                }
            }).then(user =>{
                console.log(user);
                alert("User created successfully");
                this.redirectToLogin();
            }).catch(err => {
                alert(err)
            });
        }
    };

    redirectToLogin = () => {
        this.props.history.push('/login');
    };

    render() {

        return (
            <div>
                <Container>
                    <img className={"imgCenter"} alt="Logo" src={logo}/>
                </Container>
                <Container className={"Container"}>
                    <h1>Register Here</h1>
                    <Form>
                        <Row className={"Row"}><Col><Input type="text" placeholder={"First Name"} name="fName" onChange = {(e) => this.setState({fName:e.target.value})}/></Col></Row>
                        <Row className={"Row"}><Col><Input type="text" placeholder={"Last Name"} name="lName" onChange = {(e) => this.setState({lName:e.target.value})}/></Col></Row>
                        <Row className={"Row"}><Col><Input type="text" placeholder={"Username"} name="username" onChange = {(e) => this.setState({username:e.target.value})}/></Col></Row>
                        <Row className={"Row"}><Col><Input type="password" placeholder={"Password"} name="password" onChange = {(e) => this.setState({password:e.target.value})}/></Col></Row>
                        <Row className={"Row"}><Col><Input type="text" placeholder={"NIC Number"} name="nic" onChange = {(e) => this.setState({nic:e.target.value})}/></Col></Row>
                        <Row className={"Row"}><Col><Input type="text" placeholder={"Email"} name="email" onChange = {(e) => this.setState({email:e.target.value})}/></Col></Row>
                        <Button color="primary" onClick={this.registerOnClick}>Register</Button>{'  '}
                        <Button color="success" onClick={this.redirectToLogin}>Go to Login page</Button>
                    </Form>
                </Container>
            </div>

        );
    }
}