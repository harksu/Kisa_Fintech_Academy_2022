import React from 'react'
import HeaderWhite from '../components/HeaderWhite'

//1.인증해서, 코드 받고~ 그걸로 토큰받기  


const AuthPage = () => {

    const handleAuthBtnClick = () => {
        //인증 받을 때 새 창을 열어서 url열기
        let tmpwindow = window.open("about:blank");
        const clientId = "발급 받은 클라이언트 아이디"
        tmpwindow.location.href = `https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=http://localhost:3000/authResult&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0`
        //인증 창 열기 
    }

    return (
        <div>
            <HeaderWhite title={"사용자 인증"}></HeaderWhite>
            <button onClick={handleAuthBtnClick}>사용자 인증 받기</button>
        </div>
    )
}

export default AuthPage