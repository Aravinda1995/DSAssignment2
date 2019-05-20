import React, { Component } from 'react';
import { Input, Button, InputGroup, InputGroupAddon, Form, Row, Col } from 'reactstrap';
import './Components.css'
import Header from "./Header"
import Container from "reactstrap/es/Container";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";

export default class TicketDetails extends Component {

    constructor(props){
        super(props);
        this.state={
            username: '',
            ticketId:'',
            fromStation:'',
            toStation:'',
            noOfTickets:'',
            noOfAdults:'',
            noOfChildren:'',
            nic:'',
            date:''
        }
    }

    componentDidMount() {
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        this.setState({username: user.username1});
    }

    // handleSubmit = event => {
    //     //const state = this.state;
    //     let user = localStorage.getItem('user');
    //     if (!user){
    //         alert("Please sign in before making reservations")
    //         this.props.history.push('/')
    //     } else {
    //
    //         if (this.state.fromStation === "" || this.state.toString() === "") {
    //             alert("Please select both source and destination stations")
    //         } else {
    //             let body = JSON.stringify({
    //                 fromStation: this.state.fromStation,
    //                 toStation: this.state.toStation,
    //                 noOfTickets: this.state.noOfTickets,
    //                 noOfAdults: this.state.noOfAdults,
    //                 noOfChildren: this.state.noOfChildren,
    //                 nic: this.state.nic,
    //                 date: this.state.date
    //             });
    //
    //             fetch("http://localhost:3001/ticketInfo/addBooking",{
    //                 method: 'POST',
    //                 body: body,
    //                 headers:{'Content-Type': 'application/json'}
    //             }).then(res => {
    //                 console.log(res);
    //                 if (res.ok){
    //                     return res.json()
    //                 } else {
    //                     alert("Invalid Ticket information");
    //                 }
    //             }).then(data => {
    //                 console.log(data);
    //                 alert("Ticket Reservation created successfully")
    //             }).catch(err => {
    //                 alert(err)
    //             });
    //             event.preventDefault();
    //             event.stopPropagation()
    //         }
    //     }
    // };

    makeReservation = () => {
        let user = localStorage.getItem('user');
        if (!user){
            alert("Please sign in before making reservations")
            this.props.history.push('/')
        } else {

            if (this.state.fromStation === "" || this.state.toString() === "") {
                alert("Please select both source and destination stations")
            } else {
                let body = JSON.stringify({
                    fromStation: this.state.fromStation,
                    toStation: this.state.toStation,
                    noOfTickets: this.state.noOfTickets,
                    noOfAdults: this.state.noOfAdults,
                    noOfChildren: this.state.noOfChildren,
                    nic: this.state.nic,
                    date: this.state.date
                });

                fetch("http://localhost:3001/ticketInfo/addBooking",{
                    method: 'POST',
                    body: body,
                    headers:{'Content-Type': 'application/json'}
                }).then(res => {
                    console.log(res);
                    if (res.ok){
                        return res.json()
                    } else {
                        alert("Invalid Ticket information");
                    }
                }).then(data => {
                    console.log(data);
                    alert("Ticket Reservation created successfully")
                }).catch(err => {
                    alert(err)
                });
            }
        }
    };

    redirectToMobilePay = () => {
        this.props.history.push('/mobilePayment');
    };

    redirectToCardPay = () => {
        this.props.history.push('/cardPayment');
    };

    redirectToLogin = () => {
        this.props.history.push('/login');
    };

    render() {
        return (
            <div>
                <Header />
                <Container className={"Container"} >
                    <Form>
                        <Row>
                            <Col>
                                <h2>Buy your train tickets here!!!</h2>
                                <Form>
                                    <Row className={"Row"}><Col><Input type="text" placeholder={"From Station"} name="fromStation" onChange = {(e) => this.setState({fromStation:e.target.value})}/></Col></Row>
                                    <Row className={"Row"}><Col><Input type="text" placeholder={"To Station"} name="toStation" onChange = {(e) => this.setState({toStation:e.target.value})}/></Col></Row>
                                    <Row className={"Row"}><Col>
                                        <InputGroup>
                                            <InputGroupAddon addonType={"prepend"}>Total number of tickets</InputGroupAddon>
                                            <Input type="number" min={0} name="noOfT" onChange = {(e) => this.setState({noOfTickets:e.target.value})}/>
                                        </InputGroup>
                                    </Col></Row>
                                    <Row className={"Row"}><Col>
                                        <InputGroup>
                                            <InputGroupAddon addonType={"prepend"}>Number of adult tickets</InputGroupAddon>
                                            <Input type="number" min={0} name="noOfA" onChange = {(e) => this.setState({noOfAdults:e.target.value})}/>
                                        </InputGroup>
                                    </Col></Row>
                                    <Row className={"Row"}><Col>
                                        <InputGroup>
                                            <InputGroupAddon addonType={"prepend"}>Number of child tickets</InputGroupAddon>
                                            <Input type="number" min={0} name="noOfC" onChange = {(e) => this.setState({noOfChildren:e.target.value})}/>
                                        </InputGroup>
                                    </Col></Row>
                                    <Row className={"Row"}><Col><Input type="text" placeholder={"NIC"} name="nic1" value={this.state.nic} onChange = {(e) => this.setState({nic:e.target.value})}/></Col></Row>
                                    <Row className={"Row"}><Col><Input type="date" placeholder={"date"} name="date" onChange = {(e) => this.setState({date:e.target.value})}/></Col></Row>
                                    <Button color={"primary"} onClick={this.makeReservation}>Make Reservation</Button>{'   '}
                                    <Button color="success" onClick={this.redirectToMobilePay}>Pay via Dialog</Button>{'  '}
                                    <Button color="success" onClick={this.redirectToCardPay}>Pay via Sampath Bank</Button>
                                </Form>
                            </Col>
                            <Col sm={15}>
                                <Form>
                                    <FormGroup>
                                        <Label>Hello {this.state.username}</Label>{'  '}
                                        <Button color="secondary" onClick={this.redirectToLogin}>Logout</Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>

        );
    }
}