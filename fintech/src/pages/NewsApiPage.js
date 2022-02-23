import React, { useState } from "react";
import HeaderWhite from "../components/HeaderWhite";
import NewsList from "../components/News/NewsList";
import SearchInput from "../components/News/SearchInput";
import axios from "axios";

const NewsApiPage = () => {
    const [searchText, setSearchText] = useState(""); //이벤트 2개 입력한 값
    const [searchResultList, setSearchResultList] = useState([]);
    // 검색했을 때 나온 결과 배열(배열로 선언해야 map으로 렌더링함 )

    const handleSearchTextChange = (e) => {
        //   input 변경사항을 search Text 반영
        const { value } = e.target; //e.target.value 가져오기 
        setSearchText(value); //검색한 값을 state로 셋
    };

    const test = null;
    const handleSearchButtonClick = () => {
        //   axios 통해 newsList 요청하기

        const searchApiUrl = `https://newsapi.org/v2/everything?q=${searchText}&from=2022-01-23&sortBy=publishedAt&apiKey=df5c4102b93d476b87ac50e0761a8f48`
        //url 상수로 선언하는데, 그 안에 입력값으로 받기  q가 검색값이니까 저기만 변경하는거임 
        axios
            .get(searchApiUrl)
            //url에 get방식으로 데이터 요청
            .then(function (response) { //then구문 실행
                console.log(response);
                setSearchResultList(response.data.articles); //아티클 관련된 부분만 추출 
            })
            .catch(function (err) { //실패시 캐치문 실행 
                console.log(err);
            });
    };

    return (
        <div>
            <HeaderWhite title="뉴스 검색"></HeaderWhite>
            <SearchInput
                handleChange={handleSearchTextChange}
                handleClick={handleSearchButtonClick} //프로퍼티 넘기기,  SearchInput에서 해당 이름으로 받아줘야됨 
            ></SearchInput>
            <NewsList searchResultList={searchResultList}></NewsList>
        </div>
    );
};

export default NewsApiPage;
