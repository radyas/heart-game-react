import React from "react";
import {Col, Container} from "react-bootstrap";
import {login} from "../../utils/auth";


export class LoginComponent extends React.Component<{}>{
    location
    history

    constructor(props: any) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.history = props.history
        this.location = props.location
    }

    async handleOnSubmit(e: any){
        e.preventDefault()
        let email: string = e.target.email.value
        let password: string = e.target.password.value
        await login(email, password)
        this.history.push(this.location.state.from.pathname)
    }

    render() {
        return(
            <Container fluid={true}>
                <main className='text-center vh-100 align-items-center row justify-content-center'>
                    <Col md={'4'}>
                        <form onSubmit={this.handleOnSubmit}>
                            <h1 className="h3 mb-3 fw-normal mb-4">Please sign in</h1>
                            <div className="form-floating mb-4">
                                <input type="email" className="form-control" placeholder=" " name='email' />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input type="password" className="form-control" placeholder=" " name='password'/>
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <div className="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value="remember-me"/> Remember me
                                </label>
                            </div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                        </form>
                    </Col>
                </main>
            </Container>

        )
    }
}