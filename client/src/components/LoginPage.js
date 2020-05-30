import React from 'react'
import { MDBContainer, MDBRow, MDBCol ,MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter,MDBJumbotron } from 'mdbreact'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { startLoginUser } from '../actions/usersAction'


class Login extends React.Component{
    constructor(){
        super()
        this.state = {
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
            email : this.state.email,
            password : this.state.password
        }
        if(this.state.email.length == 0 || this.state.password.length == 0){
            Swal.fire(
                'Error',
                `${this.state.email.length == 0 ? ' please enter valid email. ' : ''}${this.state.password.length == 0 ? 'please enter password. ' : ''}`,
                'error'
            )
        }
        else{
            const redirect = (address) => {
                return this.props.history.push(`${address}`)
            }
            this.props.dispatch(startLoginUser({formData,redirect}))
        }
    }
    render(){
        return(
        <div style={{backgroundImage : `url(https://wallpapercave.com/wp/wp2553455.jpg)`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:"no-repeat",width:'100%'}}>
            <br /><br /><br />
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="8">
                    <MDBJumbotron fluid style={{opacity:'0.9'}}>
                        <MDBContainer>
                        <h1 className="h1-responsive font-weight-bold">
                            Want to know what yours friends thinking about you ?
                        </h1>
                        <ul>
                            <li><h4 className="h4-responsive font-weight-bold">
                            Just Register your account here and login</h4></li>
                            <li><h4 className="h4-responsive font-weight-bold">
                            And share the link which is generated to yours friends</h4></li>
                            <li><h4 className="h4-responsive font-weight-bold">
                            Know what yours friends thinking about you</h4></li>
                        </ul>
                        <h2 className="h2-responsive font-weight-bold">
                            About this application
                        </h2>
                        <h5 className="h5-responsive">
                            This application is made just for fun and to know what yours friend thinking about you, there will be set of questions where the users should fill or select when the link is shared.<br />
                            <strong>Note - </strong>The user's name who is written about their friend is not visible to the people who shared the link         
                        </h5>
                        </MDBContainer>
                        </MDBJumbotron>
                    </MDBCol>
                    <MDBCol md="4" >
                    <MDBCard  style={{opacity:'0.9'}}>
                            <MDBCardBody className="mx-4" >
                            <div className="text-center">
                                <h3 className="dark-grey-text mb-5">
                                <strong>Sign in</strong>
                                </h3>
                            </div>
                            <form onSubmit={this.handleSubmit}>
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
                                Sign in
                                </MDBBtn>
                            </div>
                            </form>
                            <MDBModalFooter className="mx-5 pt-3 mb-1">
                            <p className="font-small grey-text d-flex justify-content-end">
                                Not a member?
                                <a href="/register" className="blue-text ml-1">
                                Sign Up
                                </a>
                            </p>
                            </MDBModalFooter>
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

export default connect()(Login)