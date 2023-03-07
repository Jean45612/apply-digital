import React, { useState } from "react";
import { ArticleNew } from "../common/ArticleNew";

const MyFaves = () => {
  const [data, setData] = useState(localStorage.getItem("myFavesNews") ? JSON.parse(localStorage.getItem("myFavesNews")) : []);

  const onClickFave = (article) => {
    let myFavesNews = JSON.parse(localStorage.getItem("myFavesNews"));

    myFavesNews = myFavesNews.filter(function (el) {
      return el.objectID !== article.objectID;
    });

    localStorage.setItem("myFavesNews", JSON.stringify(myFavesNews));
    setData(myFavesNews);
  };

  return (
    <>
      <section className="news">
        {data.map((d, index) => {
          return (
            <ArticleNew article={d} onClickFave={onClickFave} key={index} />
          );
        })}
      </section>
    </>
  );
};

export default MyFaves;
