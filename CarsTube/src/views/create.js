import { create } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../utils.js";

const createTemplate = (userData, ctx, onSubmit) => html`
    ${userData == null 
        ? ctx.page.redirect('/login') 
        : html`
        <section id="create-listing">
            <div class="container">
                <form @submit=${onSubmit} id="create-form">
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create an listing.</p>
                    <hr>
        
                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand">
        
                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model">
        
                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description">
        
                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year">
        
                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl">
        
                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price">
        
                    <hr>
                    <input type="submit" class="registerbtn" value="Create Listing">
                </form>
            </div>
        </section>`}
    `;

export function createPage(ctx) {
    const userData = getUserData();
    ctx.render(createTemplate(userData, ctx, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const brand = formData.get('brand').trim();
        const model = formData.get('model').trim();
        const description = formData.get('description').trim();
        const year = formData.get('year').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const price = formData.get('price').trim();

        if (brand == '' || model == '' || description == '' || year == '' || imageUrl == '' || price == '') {
            return alert('All fields are required!');
        }

        if (year < 0) {
            return alert('Year should be positive number!');

        }

        if (price < 0) {
            return alert('Price should be positive number!');
        }

        const car = {
            brand,
            model,
            description,
            year: Number(year),
            imageUrl,
            price : Number(price)
        }

        await create(car);
        ctx.page.redirect('/catalog');
    }
}