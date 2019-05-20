import React, { Component } from 'react';
import './Components.css'
import { Input, Button, Form, Col, Container, Row } from 'reactstrap';
import logo from "../Assets/tickets.png";


export default class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        };

        this.baseState = this.state;
    }

    componentWillUnmount() {
        this.setState(this.baseState)
    }

    userLogin =() => {
        if (this.state.username === "" || this.state.password === "") {
            alert("Username or password empty!!")
        } else {
            fetch("http://localhost:3001/user/logIn",{
                method: 'POST',
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                }),
                headers:{'Content-Type': 'application/json'}
            }).then(res => {
                console.log(res);
                if (res.ok){
                    this.redirectToHome();
                    return res.json();
                } else {
                    alert("Invalid username or password");
                }
            }).then(data => {
                console.log(data);
                localStorage.setItem('user', JSON.stringify({
                    username1: this.state.username
                }));
            }).catch(err => {
                alert(err)
            });
        }
    };

    redirectToHome = () => {
        this.props.history.push('/homepage');
    };

    redirectToRegister = () => {
        this.props.history.push('/register');
    };

    render() {
        return (
            <div>
                <Container>
                    <img className={"imgCenter"} alt="Logo" src={logo}/>
                </Container>
                <Container className={"Container"}>
                    <h1>Login</h1>
                    <Form>
                        <Row className={"Row"}>
                            <Col><Input type="text" placeholder={"Username"} name="username" onChange = {(e) => this.setState({username:e.target.value})}/></Col>
                        </Row>
                        <Row className={"Row"}>
                            <Col><Input type="password" placeholder={"Password"} name="password" onChange = {(e) => this.setState({password:e.target.value})}/></Col>
                        </Row>
                        <Button color="primary" onClick={this.userLogin}>Login</Button>{'  '}
                        <Button color="success" onClick={this.redirectToRegister}>Go to Registration page</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}
