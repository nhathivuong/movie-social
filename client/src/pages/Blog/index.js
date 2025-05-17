import styled from "styled-components"

const Blog = () =>{
    return <BlogBoard>
        <BlogTitle>Film Media Blog</BlogTitle>
        <MonthlyUpdate>
            <UpdateTitle>May 2025 updates</UpdateTitle>
            <p>This month, the focus was enhancing user interactions. I aimed to improve the social media aspect of the project by allowing user to like and comment review.</p>
            <UpdateSectionTitle>Overview</UpdateSectionTitle>
            <ul>
                <ListDecoration><p>Like review</p></ListDecoration>
                <ListDecoration><p>Comment on review</p></ListDecoration>
            </ul>
            <UpdateSectionTitle>Bug Fixes</UpdateSectionTitle>
            <ul>
                <ListDecoration><p>Fixed an issue where the cast section on movie pages with 8 or fewer cast members displayed the scroll buttons</p></ListDecoration>
                <ListDecoration><p> Fixed styling issues with imported reviews from TMDB to improve readability</p></ListDecoration>
            </ul>
        </MonthlyUpdate>
    </BlogBoard>
}
const BlogTitle = styled.h1`
    margin: 2rem auto 0 auto;
    width:fit-content;
`
const MonthlyUpdate = styled.div`
    max-width: 800px;
`
const UpdateTitle = styled.h2`
    margin: 1rem auto;
`
const UpdateSectionTitle = styled.h3`
    margin: 1rem 0 0.5rem 0;
`
const BlogBoard = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
`
const ListDecoration = styled.li`
    list-style: disc;
    margin-left: 2rem;
`

export default Blog