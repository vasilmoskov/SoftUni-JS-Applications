import { logout } from "./api/data.js";
import { page,render } from "./lib.js";
import { getUserData } from "./utils.js";
import { createPage } from "./views/create.js";
import { dashboardPage } from "./views/dashboard.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { profilePage } from "./views/my-books.js";
import { registerPage } from "./views/register.js";

const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

updateUserNav();

page(decorateContext);
page('/', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/my-books', profilePage);
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function updateUserNav() {
    const userData = getUserData();

    if(userData != undefined) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').querySelector('span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }
}

async function onLogout() {
    await logout();
    updateUserNav();
    page.redirect('/');
}