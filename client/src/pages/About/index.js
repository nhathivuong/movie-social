import styled from "styled-components"

const About = () =>{
    return <AboutSize>
        <h1>Film Media</h1>
        <h2>About Us</h2>
        <AboutUsText>Film Media was created with the vision of combining movie critiques and social interaction into one seamless digital experience. In a world where film lovers often turn to scattered platforms for reviews, discussions and recommendations, Film Media brings it all together under one roof.</AboutUsText>
        <AboutUsText>This full stack web application allows users to not only rate and review their favorite films, but also connect with a community of fellow movie buffs. Think of it as part movie database, part social hub. Whether you're writing an in-depth critique, sharing a quick take, or just browsing what others think before watching, Film Media makes it simple and engaging.</AboutUsText>
        <AboutUsText>Built using modern web technologies, Film Media leverages React, Node.js, Express, MongoDB. From designing the user interface to building secure user authentication and real-time data updates, this project showcases a wide range of full stack development skills.</AboutUsText>
        <h2>Meet the developer</h2>
        <DeveloperPicture src="/assets/me.JPG" alt="a picture of the developer"/>
        <p>Hi, I'm Nha-Thi Vuong, a full-stack web developer with a strong foundation in HTML, CSS, JavaScript, and React. When I'm not coding, I enjoy watercolor painting and storytelling.</p>
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
const AboutUsText = styled.p`
    margin-bottom: 1rem;
`
const DeveloperPicture = styled.img`
    border-radius: 50%;
    max-width: 150px;
    margin: 1rem;
`
export default About