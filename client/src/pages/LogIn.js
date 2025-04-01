const LogIn = () =>{
    return <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" placeholder="your username"/>
            <button disabled={status !== "idle"}>Log in</button>
        </form>
}
// rememeber me to auto login
export default LogIn