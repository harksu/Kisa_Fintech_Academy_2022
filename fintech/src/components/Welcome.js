import styled from "styled-components";

const WelcomeBlock = styled.div`
    margin: 20px;
`;


const Welcome = (props) => {
    return (<div>
        안녕하세요! {props.age}세 {props.username}님! 반갑습니다.
    </div>)
}

export default Welcome; 