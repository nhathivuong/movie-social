const LogIn = () =>{
    return <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" placeholder="your username"/>
            <button >Log in</button>
        </form>
}
// remember me to auto login
export default LogIn