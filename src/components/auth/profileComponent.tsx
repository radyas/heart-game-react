import React from "react";
import {authUser, db} from "../../utils/firebase";
import {Firebase_Dao} from "../../utils/firebase_dao";

export class ProfileComponent extends React.Component<any, any>{
    state = {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        admin: false,
    }
    user

    constructor(props: any) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.user = authUser.user
        this.state = {
            id: this.user?.id,
            first_name: this.user?.firstName,
            last_name: this.user?.lastName,
            email: this.user?.email,
            admin: false,
        }
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
        let dao = new Firebase_Dao(db)
        let data = {
            firstName: this.state.first_name,
            lastName: this.state.last_name,
        }
        await dao.update_object('users', data, this.state.id)
        alert('successful')
    }

    render() {
        return(
            <>
                <h2>Profile</h2>
                <hr/>
                <form onSubmit={this.handleOnSubmit}>
                    <div className="form-floating mb-4 mt-5">
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
                    <button className="w-100 btn btn-lg btn-primary" type="submit">
                        Submit
                    </button>
                </form>
            </>
        )
    }
}