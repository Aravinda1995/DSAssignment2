import React, { Component } from 'react';
import './Components.css'
import Header from "./Header"
import { Input, Button, Form, Container, Col, Row, FormGroup } from 'reactstrap';
import Label from "reactstrap/es/Label";
import logo from "../Assets/tickets.png";

export default class SampathPayment extends Component {

    constructor(props){
        super(props);
        this.state= {
            cardHolder: '',
            ccNumber: '',
            cvcNumber: '',
            expDate:'',
            amount: '',
            discount: '',
            totalAmount: ''
        }
    }

    componentDidMount() {
        this.fetchAmount('http://localhost:3001/cardPaymentInfo/price')
    }

    fetchAmount = (url) => {
        fetch(url).then(res =>{
            if (res.ok){
                return res.json();
            } else {
                alert("Error: When obtaining ticket prices")
            }
        }).then(data =>{
            this.setState({
                amount: data.amount,
                discount: data.discount,
                totalAmount: data.totalAmount
            })
        })
    };

    handleSubmit = event => {
        if (this.state.cardHolder === "" || this.state.ccNumber === "" || this.state.cvcNumber === "" || this.state.expDate === "" || this.state.amount === "") {
            alert("Some fields are empty")
        } else {
            let body = JSON.stringify({
                cardHolder: this.state.cardHolder,
                ccNumber: this.state.ccNumber,
                cvcNumber: this.state.cvcNumber,
                expDate: this.state.expDate,
                amount: this.state.totalAmount
            });

            fetch("http://localhost:3001/cardPaymentInfo",{
                method: 'POST',
                body: body,
                headers:{'Content-Type': 'application/json'}
            }).then(res => {
                console.log(res);
                if (res.ok){
                    return res.json()
                }
            }).then(data => {
                alert("Payment is successful");
                this.redirectToHome();
            }).catch(err => {
                alert(err)
            });
            event.preventDefault();
            event.stopPropagation()
        }
    };


    redirectToHome = () => {
        this.props.history.push('/homepage');
    };

    render() {
        return (
            <div>
                <Container>
                    <img className={"imgCenter"} alt="Logo" src={logo}/>
                </Container>
                <Container className={"Container"}>
                    <h1>Enter payment details</h1>
                    <Form onSubmit={e => {this.handleSubmit(e)}}>
                        <Row className={"Row"}><Col><Input type="text" placeholder={"Card holder name"} name="cardHolder" onChange = {(e) => this.setState({cardHolder:e.target.value})}/></Col></Row>
                        <Row className={"Row"}><Col><Input type="text" placeholder={"Card number"} name="ccNumber" onChange = {(e) => this.setState({ccNumber:e.target.value})}/></Col></Row>
                        <Row className={"Row"}>
                            <Col><Input type="text" placeholder={"CVC"} name="cvcNumber" onChange = {(e) => this.setState({cvcNumber:e.target.value})}/></Col>
                            <Col><Input type="text" placeholder={"expDate"} name="expDate" onChange = {(e) => this.setState({expDate:e.target.value})}/></Col>
                        </Row >
                        <FormGroup>
                            <Label>Amount</Label>
                            <Col sm={5}>{this.state.amount} LKR</Col>
                        </FormGroup>
                        <FormGroup>
                            <Label>Discount</Label>
                            <Col sm={5}>{this.state.discount} LKR</Col>
                        </FormGroup>

                        <FormGroup>
                            <Label>Total</Label>
                            <Col sm={5}>{this.state.totalAmount} LKR</Col>
                        </FormGroup>
                        <Button color="primary">Pay</Button>{'  '}
                        <Button color="danger" onClick={this.redirectToHome}>Cancel</Button>
                    </Form>
                </Container>
            </div>

        );
    }
}