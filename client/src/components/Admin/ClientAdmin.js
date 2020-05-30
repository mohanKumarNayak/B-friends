import React from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBJumbotron, MDBRow, MDBCol,MDBBtn, MDBDataTable,MDBModal,MDBModalBody,MDBModalFooter,MDBModalHeader } from 'mdbreact'

class ClientAdmin extends React.Component{
    constructor(props){
        super(props)
        this.state={
            modal : false,
            id : ''
        }
    }
    handleInfo = (id) =>{
        this.setState({
            modal : !this.state.modal,
            id : id
        })
    }
render(){
    const data = {
        columns: [
          {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Email',
            field: 'email',
            sort: 'asc',
            width: 270
          },
          {
            label: 'Mobile',
            field: 'mobile',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Info',
            field: 'info',
            width: 150
          },
        ],

        rows : this.props.allClient && this.props.allClient.map(client=>{
            return {
                name : client.fullname,
                email : client.email,
                mobile : client.mobile,
                info : <MDBBtn size="sm" onClick={()=>this.handleInfo(client.user)}>info</MDBBtn>,
            }
        }),
        
      };
    return(
        <div style={{backgroundColor:"#e3e1de"}}>
             <br /><br /><br />
             <MDBContainer>
                    <MDBRow center>
                        <MDBCol>
                            <h2>Total Clients - {this.props.allClient && this.props.allClient.length} </h2>
                            <MDBDataTable
                                striped
                                hover
                                data={data}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBModal isOpen={this.state.modal} toggle={()=>{this.handleInfo('')}} size="lg">
                <MDBModalHeader toggle={()=>{this.handleInfo('')}}>Client Details</MDBModalHeader>
                <MDBModalBody>
                {
                   this.props.allClient && this.props.allClient.filter(client=>client.user==this.state.id).map((client,i)=>{
                       return(
                           <div key={i+'client'}>
                               <h2> {client.fullname} </h2>
                               <h5> {client.address} </h5>
                               <h5> {client.mobile} </h5>
                               <h5> {client.gender} </h5>
                               <h5> {client.status} </h5>
                               {
                                   client.messages && client.messages.map((message,ii)=>{
                                       return(
                                           <div key={ii+'newClient'}>
                                               <h2>Message - {ii+1} </h2>
                                               <h5><strong>Name</strong><br/> -> {message.name ? message.name : 'not answered'} </h5>
                                               <h5><strong>Relation with you</strong> ? <br/> -> {message.relation ? message.relation : 'not answered'} </h5>
                                                    <h5><strong>One word for you </strong> ? <br/> -> {message.oneWord ? message.oneWord : 'not answered'} </h5>
                                                    <h5><strong>FirstMeet </strong> ? <br/> -> {message.firstMeet ? message.firstMeet : 'not answered'} </h5>
                                                    <h5><strong>Fight with you</strong> ? <br/> -> {message.fight ? message.fight : 'not answered'} </h5>
                                                    <h5><strong>Good quality about you </strong> ? <br/> -> {message.good ? message.good : 'not answered'} </h5>
                                                    <h5><strong>Bad quality about you </strong> ? <br/> -> {message.bad ? message.bad : 'not answered'} </h5>
                                                    <h5><strong>Did you get betrayed </strong> ? <br/> -> {message.betray ? message.betray : 'not answered'} </h5>
                                                    <h5><strong>Message about you </strong> ? <br/> -> {message.box ? message.box : 'not answered'} </h5>
                                                    <hr />
                                           </div>
                                       )
                                   })
                               }
                           </div>
                       )
                   })
                }
                </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn color="secondary" onClick={()=>{this.handleInfo('')}}>Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        
             </MDBContainer>
                   
        </div>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        allClient : state.allClient
    }
}

export default connect(mapStateToProps)(ClientAdmin)