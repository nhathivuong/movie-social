// dependencies
import { useState } from "react"
import styled from "styled-components"
// icons
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";

// components
import BackToTop from "../../utilities/BackToTop";

const Blog = () =>{
    const [roadmapOpen, setRoadmapopen] = useState(false)
    const toggleRoadmap = () =>{
        setRoadmapopen(!roadmapOpen)
    }
    return <BlogBoard>
        <BackToTop/>
        <BlogTitle>Film Media Blog</BlogTitle>
        <RoadmapButton onClick={toggleRoadmap}>What's next{roadmapOpen?<IoMdArrowDropupCircle />:<IoMdArrowDropdownCircle />}</RoadmapButton>
        {roadmapOpen && <UpdateSection>
            <UpdateTitle>Roadmap</UpdateTitle>
            <p>Below is a list of features I plan to work on in the near future. These will improve the project and add more functionality.</p>
            <p>Please note: the features listed aren't in any particular order—they may change depending on priority, feedback, or what I feel excited to work on next!</p>
            <UpdateSectionTitle>Features</UpdateSectionTitle>
            <ul>
                <ListDecoration><p>Responsive Design for mobile</p></ListDecoration>
                <ListDecoration><p>Chat system</p></ListDecoration>
                <ListDecoration><p>Increased security</p></ListDecoration>
                <ListDecoration><p>Personalised recommendations</p></ListDecoration>
                <ListDecoration><p>User movie statistics</p></ListDecoration>
            </ul>
            <UpdateSectionTitle>Known issues</UpdateSectionTitle>
            <ul>
                <ListDecoration>Review interactions (like, comment and read more)</ListDecoration>
                <ListDecoration>Back to top for individual movie page </ListDecoration>
                <ListDecoration>Empty comment posting</ListDecoration>
            </ul>
        </UpdateSection>}
        <DividerImage src="/assets/renata-kiss-mnDPfYyDF7Y-unsplash.jpg" alt="Pink flowers"/>
        <UpdateSection>
            <UpdateTitle>May 2025 updates</UpdateTitle>
            <p>This month, the focus was enhancing user interactions. I aimed to improve the social media aspect of the project by allowing users to like and comment reviews. I also added some pages to introduce the project and showcase monthly updates.</p>
            <UpdateSectionTitle>Overview</UpdateSectionTitle>
            <ul>
                <ListDecoration><p>Like review</p></ListDecoration>
                <ListDecoration><p>Comment on review</p></ListDecoration>
                <ListDecoration><p>Footer Navigation and additional pages</p></ListDecoration>
                <ListDecoration><p>Back to top functionality</p></ListDecoration>
                <ListDecoration><p>Profile picture in the header</p></ListDecoration>
            </ul>
            <UpdateSectionTitle>Bug Fixes</UpdateSectionTitle>
            <ul>
                <ListDecoration><p>Fixed an issue where the cast section on movie pages with 8 or fewer cast members displayed the scroll buttons</p></ListDecoration>
                <ListDecoration><p>Fixed styling issues with imported reviews from TMDB to improve readability</p></ListDecoration>
            </ul>
        </UpdateSection >
    </BlogBoard>
}
const BlogTitle = styled.h1`
    margin: 2rem auto 0 auto;
    width:fit-content;
`
const RoadmapButton = styled.button`
    background-color: transparent;
    color: var(--color-accent);
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    border: 1px solid var(--color-accent);
    &:hover{
        color: var(--color-dark);
        background-color: var(--color-accent);
        text-decoration: underline;
    }
    &:active{
        box-shadow: 0 0 2px var(--color-dark) inset;
    }
`
const UpdateSection = styled.div`
    max-width: 85%;
    display:flex;
    flex-direction: column;
    gap:0.5rem;
`

const DividerImage = styled.img`
    width: 100%;
    height: 30vh;
    overflow: hidden;
    object-fit: cover;
    margin-top: 1rem;
`
const UpdateTitle = styled.h2`
    margin: 1rem auto;
`
const UpdateSectionTitle = styled.h3`
    margin: 1rem 0 0.5rem 0;
    text-transform: uppercase;
`
const ListDecoration = styled.li`
    list-style: disc;
    margin-left: 2rem;
`
const BlogBoard = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.5;
`
export default Blog