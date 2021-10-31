async function solution() {
    let articles = await getArticles();
    articles.forEach(a => createArticle(a));
}

async function getArticles() {
    let url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    let res = await fetch(url);
    let data = await res.json();

    return Object.values(data);
}

async function getArticleById(articleId) {
    let url = `http://localhost:3030/jsonstore/advanced/articles/details/${articleId}`;

    let res = await fetch(url);
    let data = await res.json();

    return data;
}

async function createArticle(a) {
    let article = await getArticleById(a._id);

    let divAccorditon = document.createElement('div');
    divAccorditon.classList.add('accordion');

    let divHead = document.createElement('div');
    divHead.classList.add('head');

    let spanTitle = document.createElement('span');
    spanTitle.textContent = article.title;

    let button = document.createElement('button');
    button.classList.add('button');
    button.id = article._id;
    button.textContent = 'More';
    button.addEventListener('click', toggleArticle);

    divHead.appendChild(spanTitle);
    divHead.appendChild(button);

    let divContent = document.createElement('div');
    divContent.classList.add('extra');

    let pContent = document.createElement('p');
    pContent.textContent = article.content;

    divContent.appendChild(pContent);

    divAccorditon.appendChild(divHead);
    divAccorditon.appendChild(divContent);

    document.getElementById('main').appendChild(divAccorditon)
}

function toggleArticle(e) {
    let button = e.target;

    let contentElement = button.parentElement.nextSibling;

    if (button.textContent == 'More') {
        contentElement.style.display = 'block';
        button.textContent = 'Less'
    } else {
        contentElement.style.display = 'none';
        button.textContent = 'More'
    }
}

solution();