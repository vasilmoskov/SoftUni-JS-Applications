import { logout } from "./api/data.js";
import {render, page} from "./lib.js"
import { getUserData } from "./utils.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { profilePage } from "./views/my-listings.js";
import { registerPage } from "./views/register.js";
import { searchPage } from "./views/search.js";

const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

updateUserNav();

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/my-listings', profilePage);
page('/search', searchPage);
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function updateUserNav() {
    const userData = getUserData();
    if(userData != null) {
        document.getElementById('profile').style.display = 'block';
        document.querySelector('#profile a').textContent = `Welcome ${userData.username}`;
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

async function onLogout() {
    await logout();
    page.redirect('/');
    updateUserNav();
}