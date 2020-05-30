import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView } from 'mdbreact';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/LoginPage';
import Register from './components/Register';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import { startLogoutUser } from './actions/usersAction';
import ClientMainPage from './components/Client/ClientMainPage';
import PostMessages from './components/Client/PostMessages';
import Messages from './components/Client/Messages';
import ClientAdmin from './components/Admin/ClientAdmin';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to log-out from your account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log out!'
    }).then((result)=>{
        if(result.value){
          this.props.dispatch(startLogoutUser())
        }
    })
  }
 

  render() {
    return (
      <Router>
        {
          Object.keys(this.props.user).length == 0 ? <div>
            <div>
        <header>
            <MDBNavbar color="bg-primary" fixed="top" dark expand="md" scrolling transparent>
              <MDBNavbarBrand href="/">
                <strong style={{fontSize:"25px",fontWeight:"400"}}>B-Friends</strong>
              </MDBNavbarBrand>
              {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBNavLink to="/login" style={{color:"black",fontSize:"20px",fontWeight:"400"}}>Login</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/register" style={{color:"black",fontSize:"20px",fontWeight:"400"}}>Register</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          
        </header>
        </div>
          </div> : <div>
              {
                this.props.user.role == 'client' && <div>
                <header>
                    <MDBNavbar color="bg-primary" fixed="top" dark expand="md" scrolling transparent>
                      <MDBNavbarBrand href="/clientHome">
                        <strong style={{fontSize:"25px",fontWeight:"400"}}>B-Friends</strong>
                      </MDBNavbarBrand>
                      {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
                      <MDBCollapse isOpen={this.state.collapse} navbar>
                        <MDBNavbarNav right>
                          <MDBNavItem>
                            <MDBNavLink to="/clientHome" style={{color:"black",fontSize:"20px",fontWeight:"400"}}>Home</MDBNavLink>
                          </MDBNavItem>
                          <MDBNavItem>
                            <MDBNavLink to="/messages" style={{color:"black",fontSize:"20px",fontWeight:"400"}}>Messages</MDBNavLink>
                          </MDBNavItem>
                          <MDBNavItem>
                            <MDBNavLink to="/clientHome" onClick={this.handleLogout} style={{color:"black",fontSize:"20px",fontWeight:"400"}}>Logout</MDBNavLink>
                          </MDBNavItem>
                        </MDBNavbarNav>
                      </MDBCollapse>
                    </MDBNavbar>
                  
                </header>
                </div>
              }
              {
                this.props.user.role == 'admin' && <div>
                <header>
                    <MDBNavbar color="bg-primary" fixed="top" dark expand="md" scrolling transparent>
                      <MDBNavbarBrand href="/adminHome">
                        <strong style={{fontSize:"25px",fontWeight:"400",color:"black"}}>B-Friends</strong>
                      </MDBNavbarBrand>
                      {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
                      <MDBCollapse isOpen={this.state.collapse} navbar>
                        <MDBNavbarNav right>
                          <MDBNavItem>
                            <MDBNavLink to="/adminHome" style={{color:"black",fontSize:"20px",fontWeight:"400"}}>client</MDBNavLink>
                          </MDBNavItem>
                          <MDBNavItem>
                            <MDBNavLink to="/adminHome" onClick={this.handleLogout} style={{color:"black",fontSize:"20px",fontWeight:"400"}}>Logout</MDBNavLink>
                          </MDBNavItem>
                        </MDBNavbarNav>
                      </MDBCollapse>
                    </MDBNavbar>
                  
                </header>
                </div>
              }
          </div>
        }
        
        <Route path="/" component={Login} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/register" component={Register} />

        <Route path="/clientHome" component={ClientMainPage} exact={true} />
        <Route path="/messages" component={Messages} />

        <Route path="/addMessage/:id" component={PostMessages} exact={true} />

        <Route path="/adminHome" component={ClientAdmin} exact={true} />
        </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
     user : state.user,
     client : state.client,
     allClient : state.allClient
  }
}

export default connect(mapStateToProps)(App);