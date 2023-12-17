let page = 1;
let limit = 3;


const renderProducts = () => {
    let skip = (page - 1) * limit;
    axios.get(`https://655c83b725b76d9884fd6e9b.mockapi.io/products?limit=${limit}&page=${page}&skip=${skip}`)
        .then((res) => {
            db = res.data;
            db.map((item) => {
                let miniDiv = document.createElement("div");
                miniDiv.className = "miniDiv";
                miniDiv.innerHTML = `
                    <img src="${item.image}" alt="">
                    <h2>${item.title}</h2>
                    <button onclick="addToCart(${item.id})">Add to Cart</button>
                `;
                products.append(miniDiv);
            });
        })
        .catch((error) => {
            console.error('Error fetching products:', error);
        });
}

loadMore.addEventListener("click", renderProducts);


const addToCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    cart.push(db.find(item => item.id == id))
    localStorage.setItem("cart", JSON.stringify(cart))
    console.log(db);
}

window.onload = () => {
    renderProducts()
}


const inp = document.getElementById("inp")
const btn = document.getElementById("btn")
const searchPro = document.getElementById("searchPro")


function findbyname() {
    axios.get("https://655c83b725b76d9884fd6e9b.mockapi.io/products")
        .then((res) => {
            db = res.data
            let filteredData = db.filter(item => item.title.toLowerCase().startsWith(inp.value.toLowerCase()))
            filteredData.map((item) => {
                let searchDiv = document.createElement("div")
                searchDiv.className = "searchDiv"
                searchDiv.innerHTML = `
    <img src="${item.image}" alt="">                 
    <h1>${item.title}</h1>
`
                searchPro.append(searchDiv)
            })
        })
}

btn.addEventListener("click", findbyname)