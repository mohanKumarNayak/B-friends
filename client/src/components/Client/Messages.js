import React from 'react'
import { MDBContainer,MDBJumbotron, MDBRow, MDBCol, MDBTypography,MDBBox,MDBCardHeader } from 'mdbreact'
import { connect } from 'react-redux'
import { startAddClient } from '../../actions/clientActions'
import { zoomIn } from 'react-animations'
import Radium,{StyleRoot} from 'radium'

const styles = {
    zoomIn: {
      animation: 'x 1s',
      animationName: Radium.keyframes(zoomIn, 'zoomIn')
    }
  }

function Messages(props){
    if(Object.keys(props.client).length == 0){
        props.dispatch(startAddClient())
    }
    return(
        <StyleRoot>
        <div style={{backgroundImage : `url(https://wallpapercave.com/wp/wp2553455.jpg)`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:"no-repeat",width:'100%'}}>
                <br /><br /><br />
                <MDBContainer>
                    <div style={styles.zoomIn}>
                    <MDBJumbotron fluid style={{opacity:'0.9'}}>
                        <MDBRow center>
                            <MDBCol md="8">
                                <MDBContainer>
                                {
                                    props.client.messages && props.client.messages.length == 0 && <h2>No Messages</h2>
                                }
                                {
                                    <MDBTypography tag='h2' variant="h2">Total Messages - {props.client && props.client.messages && props.client.messages.length} </MDBTypography>
                                    
                                }
                                {
                                    props.client && props.client.messages && props.client.messages.map((message,i)=>{
                                        return(
                                            <div key={i+'message'}>
                                                <MDBCardHeader className="border-0 font-weight-bold d-flex justify-content-between">
                                                <p className="mr-4 mb-0" style={{fontSize:"25px"}} >Message - {i+1} </p>
                                                </MDBCardHeader>
                                                <MDBTypography blockquote>
                                                    <h5><strong>Relation with you</strong> ? <br/> -> {message.relation ? message.relation : 'not answered'} </h5>
                                                    <h5><strong>One word for you </strong> ? <br/> -> {message.oneWord ? message.oneWord : 'not answered'} </h5>
                                                    <h5><strong>FirstMeet </strong> ? <br/> -> {message.firstMeet ? message.firstMeet : 'not answered'} </h5>
                                                    <h5><strong>Fight with you</strong> ? <br/> -> {message.fight ? message.fight : 'not answered'} </h5>
                                                    <h5><strong>Good quality about you </strong> ? <br/> -> {message.good ? message.good : 'not answered'} </h5>
                                                    <h5><strong>Bad quality about you </strong> ? <br/> -> {message.bad ? message.bad : 'not answered'} </h5>
                                                    <h5><strong>Did you get betrayed </strong> ? <br/> -> {message.betray ? message.betray : 'not answered'} </h5>
                                                    <h5><strong>Message about you </strong> ? <br/> -> {message.box ? message.box : 'not answered'} </h5>
                                                    
                                                </MDBTypography>
                                            </div>
                                        )
                                    })
                                }
                                

                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>
                        
                    </MDBJumbotron>
                    </div>
                </MDBContainer>
        </div>
        </StyleRoot>
    )
}

const mapStateToProps = (state) => {
    return{
        client : state.client
    }
}

export default connect (mapStateToProps)(Messages)