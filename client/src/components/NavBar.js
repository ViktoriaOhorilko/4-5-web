import React, {useContext} from 'react'
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from '../context/AuthContext'

export const NavBar = () => {

    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }


    return(
        <nav>
            <div className="nav-wrapper blue darken-1">
                <span href="/" className="brand-logo" style={styles.nav_div}>Spicle</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/articles">Articles</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}



const styles = {
    nav_div: {
        padding: '0 2rem',
    },
}
