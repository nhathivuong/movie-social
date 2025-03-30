import {useState} from "react"

const SignUp = () => {
    const [src, setSrc] = useState()
    const [file, setFile] = useState()

    const handleSignUp = () => {

    }
    return <>
    <form onSubmit={handleSignUp}>
        <label htmlFor="full-name">Full Name</label>
        <input type="text" id="full-name" name="full-name"/>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username"/>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email"/>
        <label htmlFor="image">
        <input
        id="image"
        type="file"
        accept="image/jpg"
        multiple={false}
        onChange={({ target: { files } }) => {
            const selectedFile = files[0];
            setFile(selectedFile);
            if (!selectedFile) return setSrc("");
            const reader = new FileReader();
            reader.onloadend = () => {
                setSrc(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }}
        ></input>
        <p>Selected File: {file ? file.name : 'None'}</p>
        {src && <img src={src} alt="your face"/>}
        </label>
        <button type="submit">SignUp</button>
    </form>
    </>
}

export default SignUp