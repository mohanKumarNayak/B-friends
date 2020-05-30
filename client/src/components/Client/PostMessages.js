import React from 'react'
import { MDBContainer, MDBJumbotron, MDBRow, MDBCol, MDBInput, MDBTypography, MDBBtn } from 'mdbreact'
import { connect } from 'react-redux'
import axios from '../../config/axios'
import Swal from 'sweetalert2'

class PostMessages extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            client : {},
            name : '',
            relation : '',
            oneWord : '',
            firstMeet : '',
            fight : '',
            good : '',
            bad : '',
            betray : '',
            box : ''
         }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    hanleSubmit = (e) => {
        e.preventDefault()
        const id = this.props.match.params.id
        const formData = {
            name : this.state.name,
            relation : this.state.relation,
            oneWord : this.state.oneWord,
            firstMeet : this.state.firstMeet,
            fight : this.state.fight,
            good : this.state.good,
            bad : this.state.bad,
            betray : this.state.betray,
            box : this.state.box
        }
        if(this.state.relation.length == 0 || this.state.oneWord.length == 0 || this.state.firstMeet.length == 0 || this.state.fight.length == 0 || this.state.good.length == 0 || this.state.bad.length == 0 || this.state.betray.length == 0 || this.state.box.length == 0){
            Swal.fire(
                'Error',
                'All fields should be entered or sent if nothing please type NA or NONE',
                'error'
            )
        }
        else{
        axios.post(`/client/addMessage/${id}`,formData)
            .then((message)=>{
                Swal.fire(
                    'Success',
                    'Messages successfully',
                    'success' 
                )
                if(localStorage.getItem('token')){
                    window.location.href = '/clientHome'
                }
                else {
                    window.location.href = '/login'
                }
            })
        }
    }
    componentDidMount = () => {
        const id = this.props.match.params.id
        axios.get(`/client/${id}`)
            .then((client)=>{
                this.setState({
                    client : client.data
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    render(){
        return(
            <div style={{backgroundImage : `url(https://wallpapercave.com/wp/wp2553455.jpg)`,backgroundSize:'cover',backgroundPosition:'center',backgroundRepeat:"no-repeat",width:'100%',height:'200vh'}}>
                <br /><br /><br />
                <MDBContainer>
                    <MDBJumbotron fluid style={{opacity:'0.9'}}>
                        <MDBRow center>
                            <MDBCol md="6">
                                <MDBContainer>
                                <MDBTypography tag='h2' variant="h2">Write about - {this.state.client.fullname} </MDBTypography>
                                <form onSubmit={this.hanleSubmit}>
                                <MDBInput label="Your's Name (Optional) And your name won't be displayed" name="name" value={this.state.name} onChange={this.handleChange} type="text" />
                                <MDBInput label={`what is relation between you and ${this.state.client.fullname}`} name="relation" value={this.state.relation} onChange={this.handleChange} type="text"/>
                                <MDBInput label={`Describe one word about ${this.state.client.fullname}`} name="oneWord" value={this.state.oneWord} onChange={this.handleChange} type="text"/>
                                <MDBInput label={`where did you and ${this.state.client.fullname} meet first time`} name="firstMeet" value={this.state.firstMeet} onChange={this.handleChange}type="text"/>
                                <MDBInput label={`Did you both fight before`} name="fight" value={this.state.fight} onChange={this.handleChange} type="text"/>
                                <MDBInput label={`Tell a good quality of ${this.state.client.fullname}`} name="good" value={this.state.good} onChange={this.handleChange} type="text"/>
                                <MDBInput label={`Tell a bad quality of ${this.state.client.fullname}`} name="bad" value={this.state.bad} onChange={this.handleChange} type="text"/>
                                <MDBInput label={`Did you betrayed ${this.state.client.fullname} without knowing him`} name="betray" value={this.state.betray} onChange={this.handleChange} type="text"/>
                                <MDBInput type="textarea" label={`Write something about ${this.state.client.fullname}`} name="box" value={this.state.box} onChange={this.handleChange} rows="5" />
                                <MDBBtn type="submit" color="success">submit</MDBBtn>
                                </form>
                                </MDBContainer>
                            </MDBCol>
                        </MDBRow>
                    </MDBJumbotron>
                </MDBContainer>
            </div>
        )
    }
}

export default connect()(PostMessages)