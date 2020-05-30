import React from 'react'
import { connect } from 'react-redux'
import { startAddClient } from '../../actions/clientActions'
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBTypography, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBIcon } from 'mdbreact'
import {WhatsappShareButton,TelegramShareButton,TwitterShareButton,FacebookShareButton,FacebookMessengerShareButton} from 'react-share'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { zoomIn } from 'react-animations'
import Radium,{StyleRoot} from 'radium'

const styles = {
    zoomIn: {
      animation: 'x 1s',
      animationName: Radium.keyframes(zoomIn, 'zoomIn')
    }
  }


class ClientShowPage extends React.Component{
    constructor(props){
        super()
        this.state = {
            modal: false,
            copied: false,
        }
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal,
          copied : false
        });
      }

    render(){
    if(Object.keys(this.props.client).length == 0){
        this.props.dispatch(startAddClient())
    }
    const url = `${window.location.protocol}//${window.location.hostname}/addMessage/${this.props.client && this.props.client.user}`
    return(
    <StyleRoot>
        <div style={{backgroundImage : `url(https://wallpapercave.com/wp/wp2553455.jpg)`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:"no-repeat",width:'100%',height:'150vh'}}>
            <br /><br /><br />
            <MDBContainer>
                <div style={styles.zoomIn}>
            <MDBJumbotron fluid style={{opacity:'0.9'}}>
                <MDBRow>
                    <MDBCol md="4">
                        <MDBContainer>
                        <MDBTypography tag='h2' variant="h2">User's Profile</MDBTypography>
                    <p style={{fontSize:"20px"}}> {this.props.client && this.props.client.fullname} </p>
                    <p style={{fontSize:"20px"}}>mobile - {this.props.client && this.props.client.mobile} </p>
                    <p style={{fontSize:"20px"}}>email - {this.props.client && this.props.client.email} </p>
                    <p style={{fontSize:"20px"}}>address - {this.props.client && this.props.client.address} </p>
                    <p style={{fontSize:"20px"}}>gender - {this.props.client && this.props.client.gender} </p>
                    <p style={{fontSize:"20px"}}>status - {this.props.client && this.props.client.status} </p>
                        </MDBContainer>

                    </MDBCol>
                    <MDBCol md="8">
                        <MDBTypography tag='h2' variant="h2">Total Messages - {this.props.client && this.props.client.messages && this.props.client.messages.length} </MDBTypography>
                       <MDBBtn onClick={this.toggle}>Generate Link</MDBBtn><br />
                       <MDBTypography tag='h5' variant="h5" className="offset-2">or</MDBTypography>
                        <MDBTypography tag='h4' variant="h4">Share it in</MDBTypography>
                       <FacebookShareButton url={url}  children={<MDBBtn color="primary"><MDBIcon fab icon="facebook-f" size="2x"/>     </MDBBtn>} />
                       <WhatsappShareButton url={`send what are u thinking about ${this.props.client.fullname} click here ${url}`} children={<MDBBtn color="success"><MDBIcon fab icon="whatsapp" size="2x"/></MDBBtn>} />
                       <TelegramShareButton url={`send what are u thinking about ${this.props.client.fullname} click here ${url}`} children={<MDBBtn color="info"><MDBIcon fab icon="telegram-plane" size="2x"/></MDBBtn>} />
                    </MDBCol>
                </MDBRow>
                
            </MDBJumbotron>
            </div>
        
            <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
        <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
        <MDBModalBody>
          <p> here is yours url click here <a href={url}>{url} </a></p>
          <CopyToClipboard text={url}
          onCopy={() => this.setState({copied: true})}>
              {
                  this.state.copied ? <MDBBtn color="success">Copied !!</MDBBtn> : <MDBBtn>copy to clipboard</MDBBtn>
              }
          
        </CopyToClipboard>
                
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
      </MDBContainer>
        </div>
        </StyleRoot>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        client : state.client
    }
}

export default connect(mapStateToProps)(ClientShowPage)