import { editMeme, getMemeById } from "../api/data.js";
import { html } from "../lib.js";
import { notify } from "../notify.js";
import { getUserData } from "../utils.js";

const editTemplate = (meme, onSubmit, isOwner, ctx) => html`
        ${!isOwner ? ctx.page.redirect('/details/' + ctx.params.id) 
        : html`
            <section id="edit-meme">
                <form @submit=${onSubmit} id="edit-form">
                    <h1>Edit Meme</h1>
                    <div class="container">
                        <label for="title">Title</label>
                        <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
                        <label for="description">Description</label>
                        <textarea id="description" placeholder="Enter Description" name="description">${meme.description}</textarea>
                        <label for="imageUrl">Image Url</label>
                        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
                        <input type="submit" class="registerbtn button" value="Edit Meme">
                    </div>
                </form>
            </section>
        `}
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const meme = await getMemeById(id);
    const userData = getUserData();
    const isOwner = userData && userData.id === meme._ownerId;

    ctx.render(editTemplate(meme, onSubmit, isOwner, ctx));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        if (title == '' || description == '' || imageUrl == '') {
            return notify('All fields are required!');
        }

        const editedMeme = {title, description, imageUrl};

        await editMeme(id, editedMeme);
        ctx.page.redirect('/details/' + id);
    }
}