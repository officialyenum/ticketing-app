import { useState } from "react";  
import useRequest from "../../hooks/useRequest";
import Router from "next/router"; 

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: "/api/users/signin",
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    })

    const handleSubmit = async e =>  {
        e.preventDefault();
        
        await doRequest();
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <div className="form-group">
                    <label>Email Address</label>
                    <input 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name="email" 
                        className="form-control"
                        />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password" 
                        name="password" 
                        className="form-control"
                    />
                </div>
                {errors}
                <button className="btn btn-primary">Sign In</button>
            </form>
        </div>
    )
}