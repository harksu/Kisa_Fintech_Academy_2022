import React from 'react'
import HeaderWhite from '../components/HeaderWhite'
import axios from 'axios';

export const AxiosTest = () => {
    const ClickAction = () => {
        console.log("클릭 ㅎㅇ");
        axios
            .get("https://newsapi.org/v2/everything?q=tesla&from=2022-01-23&sortBy=publishedAt&apiKey=df5c4102b93d476b87ac50e0761a8f48")
            //url에 get방식으로 데이터 요청
            .then(function (response) { //then구문 실행
                console.log(response);
            })
            .catch(function (err) { //실패시 캐치문 실행 
                console.log(err);
            });
    }

    return (
        <div>
            <HeaderWhite title="http 통신"></HeaderWhite>
            <button onClick={ClickAction}>데이터 요쳥하기</button>
        </div>
    )
}
