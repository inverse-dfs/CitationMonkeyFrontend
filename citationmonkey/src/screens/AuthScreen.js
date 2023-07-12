import React from "react"
import * as comps from '../components'

export const AuthScreen = ({setLoggedIn}) => {
    const [page, setPage] = React.useState(0);
    return (
        <>
            {
                page == 0 ? <comps.UserLogin setLoggedIn={setLoggedIn} setPage={setPage}/> : <comps.UserCreate setPage={setPage}/>
            }
        </>
    )
}