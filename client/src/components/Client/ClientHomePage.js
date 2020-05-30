import React from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBContainer, MDBJumbotron } from 'mdbreact';
import { connect } from 'react-redux';
import { startAddProfileClient } from '../../actions/clientActions';
import Swal from 'sweetalert2';

class ClientHomePage extends React.Component {
  state = {
    fullname : '',
    mobile : '',
    gender : '',
    address : '',
    status : ''
  };

  submitHandler = event => {
    event.preventDefault();
    event.target.className += ' was-validated';
    const formData = {
      fullname : this.state.fullname,
      mobile : this.state.mobile,
      gender : this.state.gender,
      address : this.state.address,
      status : this.state.status,
      profile : 'added'
    }
    if(this.state.fullname.length == 0 ||this.state.mobile.length == 0 ||this.state.gender.length == 0 ||this.state.address.length == 0 ||this.state.status.length == 0){
      Swal.fire(
        'Error',
        'All fields are required',
        'error'
      )
    }
    else{
    this.props.dispatch(startAddProfileClient({formData}))
    }
  };

  changeHandler = event => {
    this.setState({
       [event.target.name]: event.target.value 
      });
  };

  render() {
    return (
      <div style={{backgroundImage : `url(https://wallpapercave.com/wp/wp2553455.jpg)`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:"no-repeat",width:'100%',height:'150vh'}}>
        <br /><br /><br />
        <MDBContainer>
        <MDBJumbotron fluid style={{opacity:'0.9'}}>
          <MDBContainer>
        <form
          className='needs-validation'
          onSubmit={this.submitHandler}
          noValidate
        >
          <MDBRow>
            <MDBCol md='4'>
              <MDBInput
                icon='user'
                value={this.state.fname}
                name='fullname'
                onChange={this.changeHandler}
                type='text'
                id='materialFormRegisterNameEx'
                label='Full Name'
                outline
                required
              >
                <div className='valid-feedback ml-3 pl-3'>Looks good!</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md='4'>
              <MDBInput
                icon='city'
                value={this.state.address}
                onChange={this.changeHandler}
                type='text'
                id='materialFormRegisterPasswordEx4'
                name='address'
                label='address'
                outline
                required
              >
                <div className='invalid-feedback ml-3 pl-3'>
                  Please provide a valid address.
                </div>
                <div className='valid-feedback ml-3 pl-3'>Looks good!</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md='4'>
              <MDBInput
                icon='mobile-alt'
                value={this.state.mobile}
                name='mobile'
                onChange={this.changeHandler}
                type='text'
                id='materialFormRegisterEmailEx2'
                label='Mobile No'
                outline
                required
              >
                <div className='valid-feedback ml-3 pl-3'>Looks good!</div>
              </MDBInput>
            </MDBCol>
           
          </MDBRow>
          <MDBRow>
          <MDBCol md='3' className="offset-2">
            <label htmlFor="gender" className="grey-text">
            Gender
          </label>
              <select className="browser-default custom-select" id="gender" name="gender" onChange={this.changeHandler} value={this.state.gender}>
              <option>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            </MDBCol>

            <MDBCol md='3'>
            <label htmlFor="status" className="grey-text">
            Martial Status
          </label>
              <select className="browser-default custom-select" id="status" name="status" onChange={this.changeHandler} value={this.state.status}>
              <option>Select Status</option>
              <option value="single">Single</option>
              <option value="committed">Commited</option>
              <option value="married">Married</option>
            </select>
            </MDBCol>
            
            
          </MDBRow>
          <br />
          <MDBBtn color='primary' type='submit'>
            Submit Form
          </MDBBtn>
        </form>
        </MDBContainer>
        </MDBJumbotron>
        </MDBContainer>
      </div>
    );
  }
}

export default connect()(ClientHomePage);