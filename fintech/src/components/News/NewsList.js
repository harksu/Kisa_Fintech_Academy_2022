import React from "react";

const NewsList = ({ searchResultList }) => {
    return <div>
        {
            searchResultList.map((news, index) => {
                return <a href={news.url} key={index}>
                    {news.title}
                </a>


            })}

    </div>

};

export default NewsList;
