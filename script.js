let resultDiv = document.getElementById("result");
let table = document.getElementById("tbl_users");

async function getPosts() {
    let data_response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await data_response.json();

    data.forEach(element => {
        // Creating a row
        let tr = document.createElement("tr");
        // Creating the data cells
        let td_id = document.createElement("td");
        let td_title = document.createElement("td");
        let td_posts = document.createElement("td");

        // Creating the posts button
        let btn_posts = document.createElement("button");

        td_id.textContent = element.id;
        td_title.textContent = element.title;

        // Configuring the posts button
        btn_posts.textContent = "View Post Details";
        btn_posts.classList.add("btn", "btn-outline-primary");
        btn_posts.name = element.id;

        // Appending td in tr
        tr.appendChild(td_id);
        tr.appendChild(td_title);
        tr.appendChild(td_posts);
        // Appending the post button in the td of post
        td_posts.appendChild(btn_posts);
        // Appending the row in the table
        table.appendChild(tr);

        // Creating an event listener for the post button
        btn_posts.addEventListener('click', async function() {
            await viewUserPosts(Number(btn_posts.name));
        });
    });
}

async function viewUserPosts(id) {
    let newWindow = window.open();
    let data_response_posts = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let data_posts = await data_response_posts.json();

    newWindow.document.write(`
        <html>
            <head>
                <title>Posts</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <header>
                    <div>
                        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                            <div class="container-fluid">
                                <a class="navbar-brand" href="#">Web Development Task 5</a>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                </div>
                            </div>
                        </nav>
                    </div>
                </header>
                <h1>ID of the Post ${data_posts.id}</h1>
                <p><strong>Title:</strong> ${data_posts.title}</p>
                <p><strong>Body:</strong> ${data_posts.body}</p>
                <button class="btn btn-primary" onclick="window.close()">Close</button>
            </body>
        </html>
    `);
}
