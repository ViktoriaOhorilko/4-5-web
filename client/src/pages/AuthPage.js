import React, {useState, useEffect, useContext} from "react"
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect( () => {
        //console.log('###',error)
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            console.log({...form})
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log(data)
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
            message(data.message)
            //console.log('Data', data)
        } catch (e) { }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Spicle</h1>
                <h3>Space of articles</h3>
                <div className="card red darken-4">
                    <div className="card-content white-text">
                        <span className="card-title">Authorize</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Enter e-mail"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Enter password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4"
                                style={styles.signInButton}
                                onClick={loginHandler}
                                disabled={loading}>Sign in</button>
                        <button className="btn yellow darken-3"
                                onClick={registerHandler}
                                disabled={loading}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


const styles = {
    signInButton: {
        marginRight: 10
    },
    logo:{
        width: '40px',
        height: '40px',
        marginTop: '5px',
        marginLeft: '60px',
        position: 'absolute'
    }
}
