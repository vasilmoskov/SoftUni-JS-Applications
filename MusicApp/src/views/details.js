import { deleteAlbum, getAlbumById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (album, isOwner, onDelete) => html`
        <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src="${album.imgUrl}">
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${album.name}</h1>
                        <h3>Artist: ${album.artist}</h3>
                        <h4>Genre: ${album.genre}</h4>
                        <h4>Price: $${album.price}</h4>
                        <h4>Date: ${album.releaseDate}</h4>
                        <p>Description: ${album.description}</p>
                    </div>

                    ${isOwner 
                        ? html`
                            <div class="actionBtn">
                                <a href="/edit/${album._id}" class="edit">Edit</a>
                                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                            </div>
                        `
                        : null}

                </div>
            </div>
        </section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const album = await getAlbumById(id);

    const userData = getUserData();
    const isOwner = userData && userData.id == album._ownerId;

    ctx.render(detailsTemplate(album, isOwner,onDelete));

    async function onDelete() {
        if(confirm(`Are you sure you want to delete ${album.name}?`)) {
            await deleteAlbum(id);
            ctx.page.redirect('/catalog');
        }
    }
}