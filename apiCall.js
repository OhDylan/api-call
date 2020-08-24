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