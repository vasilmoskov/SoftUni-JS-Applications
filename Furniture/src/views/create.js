import { create } from "../api/data.js";
import { html } from "../lib.js";

const createTemplate = (onCreate, errorMsg, errors) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onCreate}>
    ${errorMsg ? html`<div class="form-control-label">${errorMsg}</div>` : null}
    <div class="row space-top">

        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${'form-control' + (errors.make ? ' is-invalid' : ' is-valid')} id="new-make" type="text"
                    name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${'form-control' + (errors.model ? ' is-invalid' : ' is-valid' )} id="new-model"
                    type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${'form-control' + (errors.year ? ' is-invalid' : ' is-valid' )} id="new-year"
                    type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${'form-control' + (errors.description ? ' is-invalid' : ' is-valid' )}
                    id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${'form-control' + (errors.price ? ' is-invalid' : ' is-valid' )} id="new-price"
                    type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${'form-control' + (errors.img ? ' is-invalid' : ' is-valid' )} id="new-image" type="text"
                    name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`;


export function createPage(ctx) {
    update(null, {});

    function update(errorMsg, errors) {
        ctx.render(createTemplate(onCreate, errorMsg, errors));
    }

    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        let make = formData.get('make').trim();
        let model = formData.get('model').trim();
        let year = Number(formData.get('year').trim());
        let description = formData.get('description').trim();
        let price = Number(formData.get('price').trim());
        let img = formData.get('img').trim();
        let material = formData.get('material').trim();

        try {

            if (!make || !model || !year || !description || !price || !img || make.length < 4 || model.length < 4 ||
                year < 1950 || year > 2050 || description.length < 10 || Number(price) < 0 || img == '') {
                throw {
                    error: new Error('Invalid field(s)'),
                    errors: {
                        make: make.length < 4 || !make,
                        model: model.length < 4 || !model,
                        year: year < 1950 || year > 2050 || !year,
                        description: description.length < 10 || !description,
                        price: price < 0 || !price,
                        img: img == '' || !img
                    }
                };
            }

            const item = {
                make,
                model,
                year,
                description,
                price,
                img,
                material
            }

            await create(item);
            e.target.reset();
            ctx.page.redirect('/');

        } catch (err) {
            const message = err.message || err.error.message;
            update(message, err.errors || {});
        }
    }
}