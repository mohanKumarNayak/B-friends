import React from 'react'
import { connect } from 'react-redux'
import { startAddClient } from '../../actions/clientActions'
import ClientHomePage from './ClientHomePage'
import ClientShowPage from './ClientShowPage'

function ClientMainPage(props){
    if(Object.keys(props.client).length == 0){
        props.dispatch(startAddClient)
    }
    return(
        <div>
            {
                props.client && props.client.profile == "empty" ? <ClientHomePage /> : <ClientShowPage />
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        client : state.client
    }
}

export default connect(mapStateToProps)(ClientMainPage)