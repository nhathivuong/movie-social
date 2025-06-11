import { useEffect, useState } from "react"
import styled, {keyframes, css} from "styled-components"

const BackToTop = () =>{
    const [windowScrolled, setWindowScrolled] = useState(false)
    useEffect(()=>{
        const scroll = () =>{
            setWindowScrolled(window.scrollY > 300)
        }
        window.addEventListener("scrollend", scroll)
        return () => window.removeEventListener("scrollend", scroll)
    },[])
    const toTop = () =>{
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    return windowScrolled && <BackToTopButton onClick={toTop}>Back To Top</BackToTopButton>
}
const fadeIn = keyframes`
    from { opacity: 0; transform: translate(-50%, 25px); }
    to { opacity: 0.9; transform: translate(-50%, 0); }
`

const BackToTopButton = styled.button`
    z-index: 100;
    display: flex;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;
    align-items: center;
    height: 2rem;
    border-radius: 1rem;
    padding: 0 1rem;
    background-color: var(--color-accent);
    border: none;
    text-transform: uppercase;
    font-weight:bold;
    color: var(--color-dark);
    cursor: pointer;
    animation: ${fadeIn} 0.5s ease;
    &:active{
        background: transparent;
        outline: 2px solid var(--color-accent);
        color: var(--color-accent);
    }
`
export default BackToTop