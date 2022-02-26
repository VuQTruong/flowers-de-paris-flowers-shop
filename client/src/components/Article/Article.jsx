import React from 'react';
import ReactHtmlParser from 'react-html-parser';

function Article(props) {
  const { title, author, coverImage, tags, summary, content, date, views } =
    props;

  return (
    <div>
      <header className='article__header'>
        <h2 className='article__title'>{title}</h2>
        <div className='article__sub-title'>
          <div className='article__info'>
            <div className='article__info-item'>
              <i className='bx bxs-user'></i>
              <span>Author: {author}</span>
            </div>
            <div className='article__info-item'>
              <i className='bx bx-calendar'></i>
              <span>Posted on: {date}</span>
            </div>

            <div className='article__info-item'>
              <i className='bx bx-show'></i>
              <span>Views: {views}</span>
            </div>
          </div>
          <ul className='article__tags'>
            {tags.length !== 0 &&
              tags.map((tag, index) => {
                if (tag !== '') {
                  return (
                    <li className='article__tag-item' key={index}>
                      <i className='bx bxs-purchase-tag'></i>
                      {tag}
                    </li>
                  );
                }

                return null;
              })}
          </ul>
        </div>
      </header>

      <section className='article__cover-image'>
        <img src={coverImage} alt='Cover' />
      </section>

      <section className='article__summary'>{summary}</section>

      <main className='article__content ck-content'>
        {ReactHtmlParser(content)}
      </main>
    </div>
  );
}

export default Article;
