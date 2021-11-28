import { edit, getById } from "../api/data.js";
import { html, until } from "../lib.js";

const editTemplate = (itemPromise) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
    ${until(itemPromise, html`<p>Loading &hellip;</p>`)}
</div>`;

const formTemplate = (item, onSubmit, errorMsg, errors) => html`
<form @submit=${onSubmit}>
    ${errorMsg ? html`<div class="form-control-label">${errorMsg}</div>` : null}
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${'form-control' + (errors.make ? ' is-invalid' : ' is-valid')} id="new-make" type="text" name="make" .value=${item.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${'form-control' + (errors.model ? ' is-invalid' : ' is-valid')} type="text" name="model" .value=${item.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${'form-control' + (errors.year ? ' is-invalid' : ' is-valid')} id="new-year" type="number" name="year" .value=${item.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${'form-control' + (errors.description ? ' is-invalid' : ' is-valid')} id="new-description" type="text" name="description"
                    .value=${item.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${'form-control' + (errors.price ? ' is-invalid' : ' is-valid')} id="new-price" type="number" name="price" .value=${item.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${'form-control' + (errors.img ? ' is-invalid' : ' is-valid')} id="new-image" type="text" name="img" .value=${item.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class=${'form-control' + (errors.material ? ' is-invalid' : ' is-valid')} id="new-material" type="text" name="material" .value=${item.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`;

export function editPage(ctx) {
    let itemPromise = getById(ctx.params.id);

    update(itemPromise, null, {});

    function update(itemPromise, errorMsg, errors) {
        ctx.render(editTemplate(loadItem(itemPromise, errorMsg, errors)));
    }

    async function loadItem(itemPromise, errorMsg, errors) {
        let item = await itemPromise;
        return formTemplate(item, onSubmit, errorMsg, errors);
    }

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        let make = formData.get('make').trim();
        let model = formData.get('model').trim();
        let year = Number(formData.get('year').trim());
        let description = formData.get('description').trim();
        let price = Number(formData.get('price').trim());
        let img = formData.get('img').trim();
        let material = formData.get('material').trim();

        const item = {
            make,
            model,
            year,
            description,
            price,
            img,
            material
        }

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

            await edit(ctx.params.id, item)
            e.target.reset();
            ctx.page.redirect('/');

        } catch (err) {
            const message = err.message || err.error.message;
            update(item, message, err.errors || {});
        }
    }
}
