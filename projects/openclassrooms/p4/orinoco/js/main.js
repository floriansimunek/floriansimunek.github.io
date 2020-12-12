//Récupération de l'id du produit dans l'url pour l'affichage (quand on clique sur le produit (view-product.html))
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('product_id');

//Création des objets
let product = new Product();
let cart = new Cart();
let order = new Order();