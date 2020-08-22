const getData = (n) => {
    return axios.get(`https://reqres.in/api/users?page=${n}`)
    .then(response => {
        const data = response.data.data;
        return data;
    }).catch(err => {
        console.log(err, err.response);
    });
};

const clearAllChildNodes = (node) => {
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
};

const renderUsers = async (n) => {
    const data = await getData(n);
    const resultRender = document.querySelector(".card_container");
    clearAllChildNodes(resultRender);
    for(const user of data){
        const card = document.createElement("div");
        const userCardBody = document.createElement("div");
        const userAvatar = document.createElement("img");
        const userName = document.createElement("h3");
        const userEmail = document.createElement("p");
        card.className = "card";
        userCardBody.className = "card-body";
        userAvatar.className = "card-img-top";
        userName.className = "card-title";
        userEmail.className = "card-text";
        
        const name = user.first_name + user.last_name;
        userAvatar.src =user.avatar;
        userAvatar.alt = name;
        userName.innerHTML = name;
        userEmail.innerHTML =user.email;
        userCardBody.append(userName, userEmail);
        card.append(userAvatar, userCardBody);
        resultRender.append(card);
    }
}