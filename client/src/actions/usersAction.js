import axios from '../config/axios'
import Swal from 'sweetalert2'
import { startGetAllClients } from './clientActions'

export const startRegisterUser = (obj) => {
    return(dispatch)=>{
        axios.post('/users/register',obj.formData)
            .then((user)=>{
                if(user.data.email){
                obj.redirect('/login')
                Swal.fire(
                    'Success',
                    'Account Successfully Registered',
                    'success'
                )
            }
                else {
                    Swal.fire(
                        'Error',
                        'Account already registered',
                        'error'
                    )
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const addUser = (user) => {
    return{type : 'ADD_USER',payload : user}
}

export const startGetAccount = () => {
    return(dispatch)=>{
        axios.get('/users/account',{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then((user)=>{
            dispatch(addUser(user.data))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const addClient = (client) => {
    return {type : 'ADD_CLIENT',payload : client}
}

export const startLoginUser = (obj) => {
    return(dispatch)=>{
        axios.post('/users/login',obj.formData)
            .then((token)=>{
                if(token.data.token){
                    localStorage.setItem('token',token.data.token)
                    axios.get('/users/account',{
                        headers : {
                            'x-auth' : token.data.token
                        }
                    })
                    .then((user)=>{
                        dispatch(addUser(user.data))
                        if(user.data.role == 'client'){
                            obj.redirect('/clientHome')
                            axios.get('/client',{
                                headers : {
                                    'x-auth' : token.data.token
                                }
                            })
                            .then((client)=>{
                                dispatch(addClient(client.data))
                            })
                            .catch((err)=>{
                                console.log(err)
                            })
                            localStorage.setItem('client',token.data.token)
                            Swal.fire(
                                'Success',
                                'Logged in successfully',
                                'success'
                            )
                        }
                        else if(user.data.role == 'admin'){
                            obj.redirect('/adminHome')
                            localStorage.setItem('admin',token.data.token)
                            dispatch(startGetAllClients())
                            Swal.fire(
                                'Success',
                                'Logged in successfully',
                                'success'
                            )
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
                else{
                    Swal.fire(
                        'Error',
                        'invalid email or password',
                        'error'
                    )
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const startLogoutUser = () => {
    return(dispatch)=>{
        axios.delete('/users/logout',{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then((response)=>{
            localStorage.clear()
            window.location.href = '/login'
            Swal.fire(
                'Success',
                'Logout successfully',
                'success'
            )
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}