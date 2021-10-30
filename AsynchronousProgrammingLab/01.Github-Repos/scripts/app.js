function loadRepos() {
	let username = document.getElementById('username').value;

	let repos = document.getElementById('repos');

	fetch(`https://api.github.com/users/${username}/repos`)
		.then(res => {
			if (res.ok == false) {
				throw new Error(`${res.status} ${res.statusText}`);
			}
			return res.json()
		})
		.then(handleResponse)
		.catch(handleError);

	function handleResponse(data) {
		repos.replaceChildren();

		for (let repo of data) {
			let liElement = document.createElement('li');
			let aElement = document.createElement('a');

			aElement.href = `${repo.html_url}`;
			aElement.textContent = `${repo.full_name}`;

			liElement.appendChild(aElement);

			repos.appendChild(liElement);
		}
	}

	function handleError(error) {
		repos.innerHTML = '';
		repos.textContent = `${error.message} `
	}
}