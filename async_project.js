// function fetchUserProfile(username) {
//     return fetch(`https://api.github.com/users/${username}`).then((raw) => raw.json())
// }

// fetchUserProfile("async").then(function (data) {
//     console.log(data);
// })


// function getUserRepos(username) {
//     return fetch(`https://api.github.com/users/${username}/repos`).then((raw) => raw.json())
// }

// getUserRepos("asynchronousJavascriptor").then(function (data) {
//     console.log(data);
// })

let searchBtn = document.querySelector(".search");
let usernameinp = document.querySelector(".usernameinp");
let card = document.querySelector(".card");

function getProfile(username) {
    return fetch(`https://api.github.com/users/${username}`).then((raw) => {
        if (!raw.ok) throw new Error(alert("User Not Found!"));
        return raw.json();
    })
}

function getRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((raw) => {
        if (!raw.ok) throw new Error("Could not find repos");
        return raw.json();
    })
}

function decorateProfileData(details) {
    console.log(details);

    let data = `     <img src="${details.avatar_url}" alt="User Avatar"
                class="w-20 h-20 rounded-full border-4 border-blue-600 object-cover" />

            <div class="flex-1">
                <h2 class="text-2xl font-bold">${details.name}</h2>
                <p class="text-gray-400 mb-2">${details.login}</p>
                <p class="text-gray-300 mb-4">${details.bio ? details.bio : "Sorry there is no bio..."}
                </p>

                <div class="grid grid-cols-3 gap-4 text-sm text-gray-300">
                    <div>
                        <span class="font-semibold text-white block">Repositories</span>
                                ${details.public_repos}
                    </div>
                    <div>
                        <span class="font-semibold text-white block">Followers</span>
                        ${details.followers}
                    </div>
                    <div>
                        <span class="font-semibold text-white block">Following</span>
                        ${details.following}
                    </div>
                </div>

                <div class="mt-4 text-sm text-gray-400">
                    <p><span class="text-white font-medium">Location:</span> ${details.location ? details.location : "N/A"}</p>
                    <p><span class="text-white font-medium">Company:</span> ${details.company ? details.company : "N/A"}</p>
                    <p><span class="text-white font-medium">Blog:</span> 
                    <a  href="${details.blog}" target="_blank">${details.blog ? details.blog : "N/A"}</a></p>
                </div>
            </div>`

    card.innerHTML = data;
}

function skeletonLoading() {
    card.innerHTML = `<!-- Skeleton Loader Card -->
<div class="bg-[#1e293b] p-6 rounded-xl max-w-xl w-full animate-pulse flex items-center space-x-6">
<div class="w-16 h-16 bg-slate-600 rounded-full"></div>
<div class="flex-1 space-y-4 py-1">
    <div class="h-4 bg-slate-600 rounded w-3/4"></div>
    <div class="h-4 bg-slate-600 rounded w-2/3"></div>
    <div class="h-4 bg-slate-600 rounded w-1/3"></div>
</div>
</div>
`
}

searchBtn.addEventListener('click', function () {
    let userName = usernameinp.value.trim();
    skeletonLoading();
    setTimeout(function () {
        if (userName.length > 0) {
            getProfile(userName).then((data) => {
                decorateProfileData(data);
                usernameinp.value = ""
            })
        }
    }, 1000)
})


// getProfile("async").then(function (data) {
//     console.log(data);
// })
// getRepos("mohan").then(function (data) {
//     console.log(data);
// })


