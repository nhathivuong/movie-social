const SignUp = () => {
    return <>
    <form>
        <label>Name</label>
        <input/>
        <label>Username</label>
        <input/>
        <label>Email</label>
        <input/>
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