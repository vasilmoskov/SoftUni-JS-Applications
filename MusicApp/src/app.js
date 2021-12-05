import { logout } from "./api/data.js";
import {page, render} from "./lib.js" 
import { getUserData } from "./utils.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { searchPage } from "./views/search.js";

const root = document.getElementById('main-content');
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
page('/search', searchPage);
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function updateUserNav() {
    const userData = getUserData();

    if(userData != null)  {
        Array.from(document.getElementsByClassName('user')).forEach(li => li.style.display = 'inline-block');
        Array.from(document.getElementsByClassName('guest')).forEach(li => li.style.display = 'none');
    } else {
        Array.from(document.getElementsByClassName('guest')).forEach(li => li.style.display = 'inline-block');
        Array.from(document.getElementsByClassName('user')).forEach(li => li.style.display = 'none');
    }
}

async function onLogout() {
    await logout();
    updateUserNav();
    page.redirect('/');
}