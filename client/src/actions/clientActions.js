import axios from '../config/axios'
import Swal from 'sweetalert2'

export const addClient = (client) => {
    return {type : 'ADD_CLIENT',payload : client}
}

export const startAddClient = () => {
    return(dispatch)=>{
        axios.get('/client',{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then((client)=>{
            dispatch(addClient(client.data))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const startAddProfileClient = (obj) => {
    return(dispatch)=>{
        axios.post('/client',obj.formData,{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then((client)=>{
            dispatch(addClient(client.data))
            Swal.fire(
                'Success',
                'Profile added successfully',
                'success'
            )
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const addAllClients = (clients) => {
    return {type : 'ADD_ALL_CLIENTS',payload:clients}
}

export const startGetAllClients = () => {
    return(dispatch)=>{
        axios.get('/admin/client')
            .then((clients)=>{
                dispatch(addAllClients(clients.data))
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

