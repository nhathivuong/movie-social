import styled from "styled-components";

const SplashScreen = () =>{
    return <LoadingPage>
            <Logo src="./assets/logo-splash.png" alt="Film media logo"/>
            <Loading></Loading>
        </LoadingPage>
}
const LoadingPage = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`
const Logo = styled.img`
    width: 15%;
`
const Loading = styled.div`
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin: auto;
    background-color: var(--color-dark-accent);
    position: relative;
    top: 10px;
    &:after{
        content: "";
        display:flex;
        background-image: conic-gradient(transparent 50%, var(--color-accent));
        border-radius: 50%;
        position: relative;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        animation: spin 2s linear infinite;
        margin: auto;
        padding: 5px;
        z-index:-1;
    }
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
`
export default SplashScreen