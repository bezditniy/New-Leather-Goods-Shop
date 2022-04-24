import React, {useState, useEffect} from "react";
import axios from "axios";
import "../scss/main.scss"
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function CreateAccount () {
    const [formEmail, setFormEmail] = useState()
    const [formUsername, setFormUsername] = useState()
    const [formPassword, setFormPassword] = useState()
    const [formPassword2, setFormPassword2] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState()

    const submitHandler = e => {
        e.preventDefault();
        setLoading(true);
        fetch('/auth/users/',
            {method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                email: formEmail,
                username: formUsername,
                password: formPassword,
                re_password: formPassword2})})
   .then(response => {
       if (response.ok) {
                window.location.replace('http://localhost:3000/shop')
                alert("You create account")
                return response.json()
            } 
            else {throw Error(`Maybe here: code ${response.status}`)}

        })
    .catch(error => {console.log(error)
                    setError('Ошибка, подробности в консоли')})
    .finally(setLoading(false))}

      return (
    
    <Container fluid style={{backgroundColor: "#110B09"}} className="py-5 my-5 contact-container">
        <Container className="d-flex justify-content-center py-5 flex-column contact-form">
            <div className="d-flex flex-column align-items-center">
                <h2 style={{fontWeight: "bold"}}>Create Account</h2>
            </div>
            <Form className="d-flex flex-column align-items-center" onSubmit={submitHandler}>
                <Form.Group className="mb-3 form-style contact-input" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Email"  value={formEmail} onChange={e => setFormEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 form-style contact-input" controlId="formBasicText">
                    <Form.Control type="text" placeholder="Username" value={formUsername} onChange={e => setFormUsername(e.target.value)}  />
                </Form.Group>
                <Form.Group className="mb-3 form-style contact-input" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password"  value={formPassword} onChange={e => setFormPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 form-style contact-input" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Re_Password" value={formPassword2} onChange={e => setFormPassword2(e.target.value)}/>
                </Form.Group>
                <Button className="common-btn contact-btn" type="submit" onClick={submitHandler}>
                    Create Account
                </Button>
            </Form>
        </Container>
    </Container>
  );
}
  
export default CreateAccount;