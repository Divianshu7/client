import axios from "axios";

export const register = async (user) => await axios.post(`${process.env.REACT_APP_API}/register`, user)
export const login = async (user) => await axios.post(`${process.env.REACT_APP_API}/login`, user)
export const updateUserInLocalStorage = (user, next) => {
    console.log(user)
    if (window.localStorage.getItem('auth')) {
        let auth = JSON.parse(window.localStorage.getItem('auth'))
        auth.user = user
        window.localStorage.setItem('auth', JSON.stringify(auth))
        next()
    }
}
