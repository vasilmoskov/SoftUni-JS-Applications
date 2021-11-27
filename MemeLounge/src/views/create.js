import { createMeme } from "../api/data.js";
import { html } from "../lib.js";
import { notify } from "../notify.js";
import { getUserData } from "../utils.js";

const createTemplate = (onSubmit, userData, ctx) => html`
        ${userData == undefined ? ctx.page.redirect('/login') 
        : html`        
        <section id="create-meme">
            <form @submit=${onSubmit} id="create-form">
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>`}
        `;

export function createPage(ctx) {
    const userData = getUserData();
    ctx.render(createTemplate(onSubmit, userData, ctx));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();

        if (title == '' || description == '' || imageUrl == '') {
            return notify('All fields are required!');
        }

        const meme = { title, description, imageUrl };

        await createMeme(meme);
        ctx.page.redirect('/memes');
    }
}