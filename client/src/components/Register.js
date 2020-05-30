import React from 'react'
import { MDBContainer, MDBRow, MDBCol ,MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter, } from 'mdbreact'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { startRegisterUser } from '../actions/usersAction'

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username:'',
            email : '',
            password : ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username:this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        if(this.state.username.length <= 5 || this.state.email.length <= 5 || this.state.password.length <= 5){
            Swal.fire(
                'Error',
                `${this.state.username.length == 0 ? 'please enter valid user name. ' : ''}${this.state.email.length == 0 ? ' please enter valid email. ' : ''}${this.state.password.length == 0 ? 'please enter password. ' : ''}`,
                'error'
            )
        }
        else{
            const redirect = (address) => {
                return this.props.history.push(`${address}`)
            }
            this.props.dispatch(startRegisterUser({formData,redirect}))
        }
       
    }
    render(){
        return(
        <div style={{backgroundImage : `url(https://wallpapercave.com/wp/wp2553455.jpg)`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:"no-repeat",width:'100%',height:'100vh'}}>
            <br /><br /><br />
            <MDBContainer>
                <MDBRow center>
                    <MDBCol md="6" >
                    <MDBCard  style={{opacity:'0.9'}}>
                    <MDBCardBody className="mx-4" >
                            <div className="text-center">
                                <h3 className="dark-grey-text mb-5">
                                <strong>Sign Up</strong>
                                </h3>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                            <MDBInput
                                label="Your username"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                name="username"
                                onChange={this.handleChange}
                                value={this.state.username}
                            />
                            <MDBInput
                                label="Your email"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                                name="email"
                                onChange={this.handleChange}
                                value={this.state.email}
                            />
                            <MDBInput
                                label="Your password"
                                group
                                type="password"
                                validate
                                containerClass="mb-0"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                            />
                            <div className="text-center mb-3">
                                <MDBBtn
                                type="submit"
                                gradient="blue"
                                rounded
                                className="btn-block z-depth-1a"
                                >
                                Register
                                </MDBBtn>
                            </div>
                            </form>
                            </MDBCardBody>
                            
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <br />
            </MDBContainer>
            <br /><br /><br />
          </div>
        )
    }
}

export default connect()(Register)