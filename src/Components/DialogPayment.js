import React, { Component } from 'react';
import './Components.css'
import Header from "./Header"
import {Input, Button, Form, Col, Container, Row, FormGroup} from 'reactstrap';
import Label from "reactstrap/es/Label";
import logo from "../Assets/tickets.png";

export default class DialogPayment extends Component {

    constructor(props){
        super(props);
        this.state={
            mobileNo:'',
            pinNo:'',
            amount:'',
            discount:'',
            totalAmount:'',
        }
    }

    componentDidMount() {
        this.fetchAmount("http://localhost:3001/mobilePaymentInfo/price");
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
        if (this.state.mobileNo === "" || this.state.pinNo === "") {
            alert("Mobile number or/and pin number empty!!")
        } else {
            let body = JSON.stringify({
                mobileNo: this.state.mobileNo,
                pinNo: this.state.pinNo,
                amount: this.state.totalAmount
            });

            fetch("http://localhost:3001/mobilePaymentInfo",{
                method: 'POST',
                body: body,
                headers:{'Content-Type': 'application/json'}
            }).then(res => {
                console.log(res);
                if (res.ok){
                    return res.json()
                }
            }).then(data => {
                console.log(data);
                alert("Amount successfully added to your dialog bill");
                this.redirectToHome()
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
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <Row className={"Row"}>
                            <Col><Input type="text" placeholder={"Mobile Number"} name="mobileNo" onChange = {(e) => this.setState({mobileNo:e.target.value})}/></Col>
                        </Row>
                        <Row className={"Row"}>
                            <Col><Input type="text" placeholder={"Enter pin number"} name="pinNo" onChange = {(e) => this.setState({pinNo:e.target.value})}/></Col>
                        </Row>
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