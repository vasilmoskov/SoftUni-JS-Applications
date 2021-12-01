import { deleteBook, getBookById, getLikesByBookId, getMyLikeByBookId, likeBook } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (book, isOwner, onDelete, likes, showLikeButton, onLike) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
                <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                ${isOwner 
                    ? html`
                        <a class="button" href="/edit/${book._id}">Edit</a>
                        <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>` 
                    : null
                }

                <!-- Bonus -->
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                ${showLikeButton
                    ? html`
                        <a @click=${onLike} class="button" href="javascript:void(0)">Like</a>
                    ` 
                    : null
                }

                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${likes}</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const userData = getUserData();

    const[book, likes, hasLike] = await Promise.all([
        getBookById(id),
        getLikesByBookId(id),
        userData ? getMyLikeByBookId(id, userData.id) : 0
    ])

    const isOwner = userData && userData.id === book._ownerId;
    const showLikeButton = userData != null && isOwner == false && hasLike == false;

    ctx.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeButton, onLike));

    async function onDelete() {
        if(confirm(`Are you sure ypu want to delete book with title ${book.title}?`)) {
            await deleteBook(id);
            ctx.page.redirect('/');
        }
    }

    async function onLike() {
        await likeBook(id);
        ctx.page.redirect('/details/' + id);
    }
}  