import React from "react";
import favico from '../../assets/favico.ico'

export const PageTitle = (props) => {
    const {pageTitle} = props

    return (
        <>
            <title>Base de Conhecimento - {pageTitle}</title>
            <link rel="shortcut icon" href={favico} type="image/x-icon" />
        </>
    )
}

export const LoginTitle = (props) => {
    const {pageTitle} = props

    return (
        <>
            <title>Login | {pageTitle}</title>
            <link rel="shortcut icon" href={favico} type="image/x-icon" />
        </>
    )
}