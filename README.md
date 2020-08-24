
++++++++++## Simple demonstration for an API call

This is a beginner-friendly demonstration for calling an external API for your web app.

The API that we are using in this demonstration is from https://reqres.in/. You do not need an API key, or anything else to perform a GET request, pretty handy for demonstration purpose.
![alt text](https://github.com/OhDylan/api-call/blob/master/assets/reqres.png?raw=true)

Let me first show you what are we trying to do in this demonstration.

We have two buttons on the page "User Page 1" and "User Page 2".
When user clicks on "User Page 1", we are fetching and rendering the user results of page 1 from external API, otherwise for "User Page 2".

![alt text](https://github.com/OhDylan/api-call/blob/master/assets/page1.png?raw=true)
*When "User Page 1" clicked.*

![alt text](https://github.com/OhDylan/api-call/blob/master/assets/page2.png?raw=true)
*When "User Page 2" clicked.*

We are going to use **axios**, a third party library which provides extremely convenient setup to perform API calls.

Some of the benefits that I realised from axios as compared to fetch api is that:

1. We do not have to define an extra utility function, to pass in methods, url, postData...etc. Axios provides us with predefined methods, such as axios.get, axios.post, and you can just use them.

2. You might also realise the frustration on handling errors with fetch API, which you might not be able to catch an error when it is not technical (e.g. API does return value. but it is falsy) and end up in successful block. Well, axios is smart enough to catch that and throws the error onto your face. 😊

3. You do not have to put in "headers" : "application/json", I know it's not a big deal, but yea.

4. You do not have to parse the results to json for axios (which fetch API only returns you Readable Stream).

So in this little demonstration, we are not going to discuss about the cosmetics of the website, but more towards the API call. 

These are the steps that I took to consider about this demonstration:
1. Create the page structure in HTML (on how would you like them to be rendered).
2. Some cosmetics, I use bootstrap 4.7.0 for this demonstration.
3. Write out the functions that we shall use to call API and render the results to browser DOM.


So here we have an index.html file:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>News</title>
    <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png">
    <link rel="manifest" href="assets/site.webmanifest">
    <link rel ="stylesheet" href ="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel ="stylesheet" href ="style.css">
</head>
<body>
    <div class="search-container">
        <span><button onclick="renderUsers('1')" type="button" class="btn btn-light">User Page 1</button></span>
        <span><button onclick="renderUsers('2')" type="button" class="btn btn-light">User Page 2</button></span>
    </div>
    <div class = "card_container"></div>
    <template id="tmplt">
        <div class="card">
            <img class="card-img-top">
            <div class="card-body">
                <h3 class="card-title"></h3>
                <p class="card-text"></p>
            </div>
        </div>
    </template>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script type="text/javascript" src="apiCall.js"></script>
</body>
</html>
```
So in this page we have two buttons: "User Page 1" and "User Page 2" on top of the page.
When user clicks on "User Page 1", we want to display user card from page 1, and page 2 if "User Page 2" is clicked.

Each user card consists of two parts: user avatar and the card body. Within the card body, there are user name and email.

For design wise you may checkout the style.css, I just did a simple one.

For apiCall.js, I wrote three functions: 
1. getData :arrow_forward: call API using axios and return the data.
2. renderUsers :arrow_forward: to render out the user cards in cards container.

Here is the apiCall.js:
```javascript
const getData = (n) => {
    return axios.get(`https://reqres.in/api/users?page=${n}`)
    .then(response => {
        const data = response.data.data;
        return data;
    }).catch(err => {
        console.log(err, err.response);
    });
};

const renderUsers = async (n) => {
    const data = await getData(n);
    const container = document.querySelector(".card_container");
    container.innerHTML = "";
    const template = document.getElementById("tmplt");  
    for(let i = 0; i < data.length; i++){
        let user = data[i];
        let clone = template.content.cloneNode(true);
        const username = user.first_name + user.last_name;
        let avatar = clone.querySelector(".card-img-top");
        avatar.src = user.avatar;
        avatar.alt = username;
        let name = clone.querySelector(".card-title");
        name.innerHTML = username;
        let email = clone.querySelector(".card-text");
        email.innerHTML = user.email;
        container.appendChild(clone);
    }
}
```
Those two buttons that we clicked ("User Page 1" and "User Page 2") are listening to onclick event and fire renderUsers function. While calling the function, parameter *n* is also passed into the function which will be used later. I hardcoded 1 and 2 for the parameter only for demonstration purpose.

So when the renderUsers function gets called, it will fire getData function and pass in the parameter (page number) and this parameter (1 or 2) is passed into the API url that we want to call. So if we pass in 1, it will get the results from page 1 and otherwise.

After getting the returned data, we are going to clear the inner html of card container in order to render new cards.

We loop through the data and grab the nested information that we want: avatar url, email and name in this case. You can always refer to API documentation to understand how does the data returned looks like, so that you know how to access them.

Finally, we input the returned information to their respective nodes and append the whole clone body to card container.

Please let me know if I can improve this demonstration or explain more in-depth towards certain things. :smiley:
