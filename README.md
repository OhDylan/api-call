## Simple demonstration for an API call

This is a beginner-friendly demonstration for calling an external API for your web app.
We are going to use **axios**, a third party library which provides extremely convenient setup to perform API calls.


Some of the benefits that I realised from axios as compared to fetch api is that:

1. We do not have to define an extra utility function, to pass in methods, url, postData...etc. Axios provides us with predefined methods, such as axios.get, axios.post, and you can just use them.

2. You might also realise the frustration on handling errors with fetch API, which you might not be able to catch an error when it is not technical (e.g. API does return value. but it is falsy) and end up in successful block. Well, axios is smart enough to catch that and throws the error onto your face. 😊

3. You do not have to put in "headers" : "application/json", I know it's not a big deal, but yea.

4. You do not have to parse the results to json for axios (which fetch API only returns you Readable Stream).


So in this little demonstration, we are not going to discuss about the cosmetic of the website, but more towards the API call. So here we have an index.html file:
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
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script type="text/javascript" src="apiCall.js"></script>
</body>
</html>
```
