window.addEventListener('DOMContentLoaded', start);

async function start() {
    let main = document.querySelector('main');

    let recipies = await getRecipies();

    main.replaceChildren();

    recipies.map(createPreview).forEach(r => main.appendChild(r));
}

function createPreview(recipe) {
    let articleElement = document.createElement('article');
    articleElement.classList.add('preview');

    let titleDivElement = document.createElement('div');
    titleDivElement.classList.add('title');

    let titleH2Element = document.createElement('h2');
    titleH2Element.textContent = recipe.name;
    titleDivElement.appendChild(titleH2Element);

    let imgDivElement = document.createElement('div');
    imgDivElement.classList.add('small');

    let imgElement = document.createElement('img');
    imgElement.src = `${recipe.img}`;
    imgDivElement.appendChild(imgElement);

    articleElement.appendChild(titleDivElement);
    articleElement.appendChild(imgDivElement);

    articleElement.addEventListener('click', () => {
        titleH2Element.textContent = 'Loading...';
        togglePreview(recipe._id, articleElement)
    });

    return articleElement;
}

async function togglePreview(id, preview) {
    let recipe = await getRecipeById(id);

    let articleElement = document.createElement('article');

    //h2
    let titleH2Element = document.createElement('h2');
    titleH2Element.textContent = recipe.name;

    //div1
    let bandDivElement = document.createElement('div');
    bandDivElement.classList.add('band');

    let thumbDivElement = document.createElement('div');
    thumbDivElement.classList.add('thumb');

    let imgElement = document.createElement('img');
    imgElement.src = `${recipe.img}`;
    thumbDivElement.appendChild(imgElement);

    let ingredientsDivElement = document.createElement('div');
    ingredientsDivElement.classList.add('ingredients');

    let ingredientsH3Element = document.createElement('h3');
    ingredientsH3Element.textContent = 'Ingredients:';

    let ingredientsUlElement = document.createElement('ul');

    Array.from(recipe.ingredients).forEach(i => {
        let ingredientLiElement = document.createElement('li');
        ingredientLiElement.textContent = i;
        ingredientsUlElement.appendChild(ingredientLiElement);
    });

    ingredientsDivElement.appendChild(ingredientsH3Element);
    ingredientsDivElement.appendChild(ingredientsUlElement);

    bandDivElement.appendChild(thumbDivElement);
    bandDivElement.appendChild(ingredientsDivElement);

    //3. div2
    let descriptionDivElement = document.createElement('div');
    descriptionDivElement.classList.add('description');

    //3.1 h3
    let preparationH3Element = document.createElement('h3');
    preparationH3Element.textContent = 'Preparation:';
    descriptionDivElement.appendChild(preparationH3Element);

    //3.2 p
    Array.from(recipe.steps).forEach(s => {
        let stepPElement = document.createElement('p');
        stepPElement.textContent = s;
        descriptionDivElement.appendChild(stepPElement);
    });

    //append h2, div1 and div2 to article

    articleElement.appendChild(titleH2Element);
    articleElement.appendChild(bandDivElement);
    articleElement.appendChild(descriptionDivElement);

    preview.replaceWith(articleElement);
}

async function getRecipies() {
    let res = await fetch('http://localhost:3030/jsonstore/cookbook/recipes');
    let data = await res.json();

    return Object.values(data);
}

async function getRecipeById(id) {
    let res = await fetch(`http://localhost:3030/jsonstore/cookbook/details/` + id);
    let data = await res.json();

    return data;
}