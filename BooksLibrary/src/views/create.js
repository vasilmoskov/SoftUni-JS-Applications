import { createBook } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../utils.js";

const createTemplate = (userData, ctx, onSubmit) => html`
    ${userData == null 
        ? ctx.page.redirect('/login') 
        : html`
            <section id="create-page" class="create">
                <form @submit=${onSubmit} id="create-form" action="" method="">
                    <fieldset>
                        <legend>Add new Book</legend>
                        <p class="field">
                            <label for="title">Title</label>
                            <span class="input">
                                <input type="text" name="title" id="title" placeholder="Title">
                            </span>
                        </p>
                        <p class="field">
                            <label for="description">Description</label>
                            <span class="input">
                                <textarea name="description" id="description" placeholder="Description"></textarea>
                            </span>
                        </p>
                        <p class="field">
                            <label for="image">Image</label>
                            <span class="input">
                                <input type="text" name="imageUrl" id="image" placeholder="Image">
                            </span>
                        </p>
                        <p class="field">
                            <label for="type">Type</label>
                            <span class="input">
                                <select id="type" name="type">
                                    <option value="Fiction">Fiction</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Mistery">Mistery</option>
                                    <option value="Classic">Clasic</option>
                                    <option value="Other">Other</option>
                                </select>
                            </span>
                        </p>
                        <input class="button submit" type="submit" value="Add Book">
                    </fieldset>
                </form>
            </section>
    `}
`;

export function createPage(ctx) {
    const userData = getUserData();
    ctx.render(createTemplate(userData, ctx, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const type = formData.get('type');

        if (title == '' || description == '' || imageUrl == '' || type == '') {
            return alert('All fields are required!');
        }

        const book = {
            title,
            description,
            imageUrl,
            type
        };

        await createBook(book);
        ctx.page.redirect('/');
    }
}