function attachEvents() {
    let postsSelectElement = document.getElementById('posts');
    let postTitleElement = document.getElementById('post-title');
    let postBodyListElement = document.getElementById('post-body');
    let postCommentsListElement = document.getElementById('post-comments');

    let loadPostsButton = document.getElementById('btnLoadPosts');
    let viewPostsButton = document.getElementById('btnViewPost');

    loadPostsButton.addEventListener('click', getAllPosts.bind(null, postsSelectElement));
    viewPostsButton.addEventListener('click', viewPost.bind(null, postTitleElement, postBodyListElement, 
        postCommentsListElement, postsSelectElement));
}

attachEvents();

async function viewPost(postTitleElement, postBodyListElement, postCommentsListElement, postsSelectElement) {
    postTitleElement.textContent = 'Loading...';
    postBodyListElement.textContent = '';
    postCommentsListElement.replaceChildren();

    let selectedId = postsSelectElement.value;

    const [post, comments] = await Promise.all([
        getPostById(selectedId), 
        getCommentsByPostId(selectedId)
    ])

    postTitleElement.textContent = post.title;
    postBodyListElement.textContent = post.body;

    comments.forEach(c => {
            let liElement = document.createElement('li');
            liElement.textContent = c.text;
            postCommentsListElement.appendChild(liElement);
    })
}

async function getAllPosts(postsSelectElement) {
    postsSelectElement.replaceChildren();

    let url = 'http://localhost:3030/jsonstore/blog/posts';
    let res = await fetch(url);
    let data = await res.json();

    Object.values(data).forEach(p => {
        let option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.title;
        postsSelectElement.appendChild(option);
    })
}

async function getPostById(postId) {
    let url = 'http://localhost:3030/jsonstore/blog/posts/' + postId;

    let res = await fetch(url);
    let data = await res.json();

    return data;
}

async function getCommentsByPostId(postId) {
    let url = 'http://localhost:3030/jsonstore/blog/comments/';

    let res = await fetch(url);
    let data = await res.json();

    const comments = Object.values(data).filter(c => c.postId == postId);

    return comments;
}
