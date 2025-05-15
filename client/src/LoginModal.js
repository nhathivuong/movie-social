import styled from "styled-components"
import Modal from 'styled-react-modal'
import { NavLink } from "react-router-dom"

const LoginModal = ({modalMessage, setModalMessage}) =>{
    return <Modal isOpen={modalMessage}>
                <AlertSection>
                    <Title>
                        <h2>Oops!</h2>
                        <ClosingButton type="button" onClick={()=>setModalMessage(false)}>x</ClosingButton>
                    </Title>
                    <p>You need to be logged in to access this feature</p>
                    <NavLink to="/login"><LogInButton type="button">Log in</LogInButton></NavLink>
                </AlertSection>
            </Modal>
    }
const AlertSection = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-dark);
    width: 25vw;
    padding: 1rem;
    border-radius: 5px;
`
const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`
const ClosingButton = styled.button`
    color: var(--color-accent);
    background-color: transparent;
    display:flex;
    justify-self: right;
    height:fit-content;
`
const LogInButton = styled.button`
    margin-top: 1rem;
    width:100%;
    height: 2rem;
    border-radius: 5px;
    background-color: var(--color-accent);
    border: none;
    text-transform: uppercase;
    font-weight:bold;
    color: var(--color-dark);
    box-shadow: 1px 1px 2px white inset, -2px -2px 2px var(--color-dark-accent) inset;
    cursor: pointer;
    &:active{
        background: transparent;
        outline: 2px solid var(--color-accent);
    }
`
export default LoginModal