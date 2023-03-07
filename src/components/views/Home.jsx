import React, { useState, useEffect } from "react";
import newsServices from "../../services/news-service";
import angularLogo from "../../assets/images/angular-logo.png";
import reactLogo from "../../assets/images/react-logo.png";
import vueLogo from "../../assets/images/vue-logo.png";
import { ArticleNew } from "../common/ArticleNew";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nPages, setNPages] = useState(0);
  const [data, setData] = useState([]);
  const [newsCategory, setNewsCategory] = useState(
    localStorage.getItem("newsCategory")
  );

  useEffect(() => {
    if (newsCategory) {
      newsServices.getNews(newsCategory, currentPage).then((response) => {
        let articles = response.hits.filter(
          (hit) =>
            hit.created_at &&
            hit.author &&
            hit.story_title &&
            (hit.story_url || hit.url)
        );

        let myFavesNews = JSON.parse(localStorage.getItem("myFavesNews"));

        articles.map((a) => {
          if (myFavesNews) {
            if (myFavesNews.find((n) => n.objectID === a.objectID)) {
              return (a.isFave = true);
            }
            return (a.isFave = false);
          }

          return (a.isFave = false);
        });

        setData(articles);
        setNPages(response.nbPages);
      });
    }
  }, [newsCategory, currentPage]);

  const onChangeNewsCategory = (e) => {
    setNewsCategory(e.target.value);
    localStorage.setItem("newsCategory", e.target.value);
  };

  const onClickFave = (article) => {
    let myFavesNews = JSON.parse(localStorage.getItem("myFavesNews"));

    const updateData = (isFave) => {
      setData(
        data.map((d) => {
          if (d.objectID === article.objectID) {
            return { ...d, isFave: isFave };
          } else {
            return d;
          }
        })
      );
    };

    if (!myFavesNews) {
      myFavesNews = [];
      article.isFave = true;
      myFavesNews.push(article);
      updateData(true);
    } else {
      if (myFavesNews.find((n) => n.objectID === article.objectID)) {
        article.isFave = false;
        myFavesNews = myFavesNews.filter(function (el) {
          return el.objectID !== article.objectID;
        });
        updateData(false);
      } else {
        article.isFave = true;
        myFavesNews.push(article);
        updateData(true);
      }
    }

    localStorage.setItem("myFavesNews", JSON.stringify(myFavesNews));
  };

  return (
    <>
      <select
        className="select__category"
        onChange={onChangeNewsCategory}
        value={newsCategory}
      >
        <option value="" hidden>
          Select your news
        </option>
        <option value="angular">Angular</option>
        <option value="reactjs">ReactJs</option>
        <option value="vuejs">VueJs</option>
      </select>

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

export default Home;
