import React from "react";
import watchImg from "../../assets/images/watch-image.svg";
import emptyHeartImg from "../../assets/images/heart-image-1.png";
import fullHeartImg from "../../assets/images/heart-image-2.png";
import timeUtil from "../../utils/timeUtil";

const onClickNew = (story_url) => {
  if (story_url) {
    window.open(story_url, "_blank");
  }
};

export const ArticleNew = (props) => {
  return (
    <article className="article__new">
      <div
        className={`article__new__container ${
          props.article.story_url ? "article__new__container--pointer" : ""
        }`}
        onClick={() => onClickNew(props.article.story_url ? props.article.story_url: props.article.url)}
      >
        <p className="article__new__container__hours">
          <img
            src={watchImg}
            alt="watch"
            className="article__new__container__hours__img"
          />
          {timeUtil.time_ago(props.article.created_at)} by {props.article.author}
        </p>
        <p className="article_new__container__description">{props.article.story_title}</p>
      </div>
      <div className="article__new__heart">
        <img src={props.article.isFave ? fullHeartImg : emptyHeartImg} alt="heart" className="article__new__heart__img" onClick={()=> props.onClickFave(props.article.objectID)}/>
      </div>
    </article>
  );
};
