import { render, screen } from '@testing-library/react';
import App from '../App';
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import {useHttp} from "../hooks/http.hook";
import {AuthPage} from "../pages/AuthPage";
import {Articles} from "../pages/Articels"
import {CreateArticle} from "../pages/CreateArticle";
import {DetailPage} from "../pages/DetailPage";
import {NavBar} from "../components/NavBar";


it('render good 1',() => {
    const div = document.createElement('div')
    ReactDOM.render(<AuthPage></AuthPage>, div)
})



it('render good 2',() => {
    const div = document.createElement('div')
    ReactDOM.render(<Articles></Articles>, div)
})

it('render good 3',() => {
    const div = document.createElement('div')
    ReactDOM.render(<CreateArticle></CreateArticle>, div)
})

it('render good 4',() => {
    const div = document.createElement('div')
    ReactDOM.render(<DetailPage></DetailPage>, div)
})


it('render good 5',() => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
})


