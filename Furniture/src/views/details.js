import { deleteItem, getById } from "../api/data.js";
import { html, until } from "../lib.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (itemPromise) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            ${until(itemPromise, html`<p>Loading &hellip;</p>`)}
        </div>`;

const itemTemplate = (item, onDelete) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${item.img} />
        </div>
    </div>
</div>
<div class="col-md-4">
    <p>Make: <span>${item.make}</span></p>
    <p>Model: <span>${item.model}</span></p>
    <p>Year: <span>${item.year}</span></p>
    <p>Description: <span>${item.description}</span></p>
    <p>Price: <span>${item.price}</span></p>
    <p>Material: <span>${item.material}</span></p>
    ${getUserData() && item._ownerId == getUserData().id ? html`
    <div>
        <a href=${`/edit/${item._id}`} class="btn btn-info">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
    </div>` : ''}
</div>`;


export function detailsPage(ctx) {
    const itemId = ctx.params.id;
    ctx.render(detailsTemplate(loadItem(itemId, onDelete)));

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this item?');

        if (confirmed) {
            await deleteItem(itemId);
            ctx.page.redirect('/');
        }
    }
}

async function loadItem(itemId, onDelete) {
    let item = await getById(itemId);
    return itemTemplate(item, onDelete);
}

