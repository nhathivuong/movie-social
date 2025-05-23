import styled from "styled-components"
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

const About = () =>{
    const [answer1, setAnswer1] = useState(false)
    const [answer2, setAnswer2] = useState(false)
    const [answer3, setAnswer3] = useState(false)

    const OpenA1 = () => {
        setAnswer1(!answer1)
    }
    const OpenA2 = () => {
        setAnswer2(!answer2)
    }
    const OpenA3 = () => {
        setAnswer3(!answer3)
    }
    const OpenAllA = () =>{
        setAnswer1(true)
        setAnswer2(true)
        setAnswer3(true)
    }
    return <AboutSize>
        <h1>Film Media</h1>
        <h2>About Us</h2>
        <TextMargin>Film Media was created with the vision of combining movie critiques and social interaction into one seamless digital experience. In a world where film lovers often turn to scattered platforms for reviews, discussions and recommendations, Film Media brings it all together under one roof.</TextMargin>
        <TextMargin>This full stack web application allows users to not only rate and review their favorite films, but also connect with a community of fellow movie buffs. Think of it as part movie database, part social hub. Whether you're writing an in-depth critique, sharing a quick take, or just browsing what others think before watching, Film Media makes it simple and engaging.</TextMargin>
        <h2>Meet the developer</h2>
        <DeveloperPicture src="/assets/me.JPG" alt="a picture of the developer"/>
        <TextMargin>Hi, I'm Nha-Thi Vuong, a full-stack web developer with a strong foundation in HTML, CSS, JavaScript, and React. When I'm not coding, I enjoy watercolor painting and storytelling.</TextMargin>
        <h2>Q&A</h2>
        <QuestionButton onClick={OpenA1}><Question>What do you enjoy most about web development?</Question><IoIosArrowDown /></QuestionButton>
        {answer1 && <Answer>I enjoy creating projects that are both creatively and logically challenging. There's also instant gratification from seeing my work come to life and being shared publicly. I also love that there's always room for improvement and continuous innovation.</Answer>}
        <QuestionButton onClick={OpenA2}><Question>What technologies were used for this project?</Question><IoIosArrowDown /></QuestionButton>
        {answer2 && <Answer>Film Media was built using React, Node.js, Express, MongoDB. For authentication,  I used JWT and bcrypt to securely handle user login and password.</Answer>}
        <QuestionButton onClick={OpenA3}><Question>What have you learned during this project?</Question><IoIosArrowDown /></QuestionButton>
        {answer3 && <Answer>I learned how to integrate a third-party API and update the frontend dynamically based on the data.  I also gained a deeper appreciation for UI design, it's a creative process that requires a lot of brainstorming and careful fine-tuning .</Answer>}
    </AboutSize>
}

const AboutSize = styled.div`
    max-width: 800px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem auto;
    padding: 2rem;
    line-height: 1.5;
`
const TextMargin = styled.p`
    margin-bottom: 1rem;
`
const DeveloperPicture = styled.img`
    border-radius: 50%;
    max-width: 150px;
    margin: 1rem;
`
const QuestionButton = styled.button`
    width: 100%;
    color: black;
    background-color: var(--color-accent);
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const Question = styled.p`
    color: black;
`
const Answer = styled(TextMargin)`
    text-align: left;
`
export default About