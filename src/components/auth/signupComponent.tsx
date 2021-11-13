import React from "react";
import {User} from "../../utils/firebase";


export class SignUpComponent extends React.Component<any>{
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        admin: false,
    }
    user: User | null
    title
    props

    constructor(props: any) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.user = props.hasOwnProperty('user') ? props.user : null
        this.title = props.hasOwnProperty('title') ? props.title : 'Register'
        this.props = props
    }

    handleOnChange(e: any) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleOnSubmit(e: any){
        e.preventDefault()
        console.log(this.props)
        this.props.handleOnSubmit({
            email: this.state.email,
            firstName: this.state.first_name,
            lastName: this.state.last_name,
            password: this.state.password,
            role: this.state.admin ? 'admin' : 'user',
        }, this.props.history)
    }

    render() {
        return(
            <form onSubmit={this.handleOnSubmit}>
                <h1 className="h3 mb-3 fw-normal mb-4">{this.title}</h1>
                <div className="form-floating mb-4">
                    <input type="text"
                           className="form-control"
                           placeholder=" "
                           name='first_name'
                           value={this.state.first_name}
                           onChange={this.handleOnChange}/>
                    <label htmlFor="floatingInput1">
                        First Name
                    </label>
                </div>
                <div className="form-floating mb-4">
                    <input type="text"
                           className="form-control"
                           placeholder=" "
                           name='last_name'
                           value={this.state.last_name}
                           onChange={this.handleOnChange}/>
                    <label htmlFor="floatingInput2">
                        Last Name
                    </label>
                </div>
                <div className="form-floating mb-4">
                    <input type="email"
                           className="form-control"
                           placeholder=" "
                           name='email'
                           value={this.state.email}
                           onChange={this.handleOnChange}/>
                    <label htmlFor="floatingInput3">
                        Email address
                    </label>
                </div>
                <div className="form-floating mb-4">
                    <input type="password"
                           className="form-control"
                           placeholder=" "
                           name='password'
                           value={this.state.password}
                           onChange={this.handleOnChange}/>
                    <label htmlFor="floatingPassword">
                        Password
                    </label>
                </div>
                <div className="form-floating mb-4">
                    <input type="password"
                           className="form-control"
                           placeholder=" "
                           name='confirm_password'
                           value={this.state.confirm_password}
                           onChange={this.handleOnChange}/>
                    <label htmlFor="floatingPassword2">
                        Confirm Password
                    </label>
                </div>
                {
                    this.user?.role === 'admin' &&
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" name='admin' onChange={this.handleOnChange}/> Admin
                        </label>
                    </div>
                }
                <button className="w-100 btn btn-lg btn-primary" type="submit">
                    Sign Up
                </button>
            </form>
        )
    }
}