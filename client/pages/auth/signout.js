import { useEffect } from "react";  
import useRequest from "../../hooks/useRequest";
import Router from "next/router"; 

export default () => {
    const { doRequest, errors } = useRequest({
        url: "/api/users/signout",
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    })

    useEffect(() => {
        doRequest()
    }, [])

    return (
        <div className="container">
           Signing you Out....
        </div>
    )
}