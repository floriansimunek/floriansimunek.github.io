class Cart {
    //Constructor de la class qui nous permet de récupérer les produits dans le panier (localStorage)
    constructor() {
        this.productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
        this.product;
        this.totalPrice = 0;
        this.initialize();
    }

    //Méthode initialize() qui se "lance" à la déclaration de la class Cart (let cart = new Cart())
    initialize() {
        if (localStorage.length > 0) {
            for (let i = 0; i < this.productsInCart.length; i++) {
                //Appel de la class Ajax qui permet de fetch() les informations de chaque "teddy" présent dans le panier depuis l'API
                let ajaxResponse = new Ajax('http://localhost:3000/api/teddies/' + this.productsInCart[i][0]);

                //Méthode getResponse() qui permet de récuperer les datas des teddies du panier
                ajaxResponse.getResponse().then(data => {
                    cart.product = data;
                }).then(function () {
                    cart.viewInCart(i);
                }).then(function () {
                    let ii = i;
                    //Partie qui nous permet de modifier la quantité d'un produit, calculer le prix total de chaque produit (price*quantity), et d'afficher le prix total du panier
                    if (document.getElementById('total_price') != null) {
                        setTimeout(() => {
                            let productQuantityInCart = document.getElementsByClassName("quantity");
                            let productPriceInCart = document.getElementsByClassName("price");
                            let productPrice = productPriceInCart[ii].getAttribute('data-price-price');

                            productQuantityInCart[ii].addEventListener('input', function () {
                                let quantityUpdate = productQuantityInCart[ii].value;
                                let totalProductPrice = parseInt(quantityUpdate) * parseInt(productPrice);

                                cart.modifyQuantity(quantityUpdate, ii);
                                cart.changeTotalProductPrice(totalProductPrice, ii);
                                cart.displayTotalPrice();
                            })
                            cart.displayTotalPrice();
                        }, 500);
                    }
                }).then(function () {
                    //Partie qui nous permet de supprimer un élément du panier depuis le button correspondant
                    let ii = i;
                    if (document.getElementById('total_price') != null) {
                        let btnSupprProductInCart = document.getElementsByClassName("btn_delete");
                        setTimeout(() => {
                            btnSupprProductInCart[ii].addEventListener('click', function (e) {
                                let myProductId = this.getAttribute('data-delete-id');
                                let myProductName = this.getAttribute('data-delete-name');
                                cart.deleteProductInCart(myProductId, myProductName, ii);
                            });
                        }, 500);
                    }
                }).then(function () {
                    cart.emptyCart();
                }).catch(error => {
                    //Récupération des messages d'erreurs en cas de problèmes(s)
                    console.error(error);
                })
            }
        }

        //On signale à l'utilisateur, par un message, que son panier est vide si le localStorage est vide
        if (document.getElementById('empty-cart') && localStorage.productsInCart === '[]' || document.getElementById('empty-cart') && localStorage.length === 0) {
            this.displayEmptyCart();
        }
        if(document.getElementById('order-display') && localStorage.productsInCart === '[]' || document.getElementById('order-display') && localStorage.length === 0){
            this.displayEmptyCart();
        }
    }

    //Méthode qui nous permet d'afficher chaque produit présent dans le panier
    viewInCart(i) {
        //Code HTML permettant d'afficher chaque produit individuellement avec Bootstrap
        let cartCode = `<tr>
                            <td>
                                <figure class="itemside align-items-center">
                                    <div class="aside col-lg-6"><a href="../pages/view-product.html?product_id=${cart.product._id}"><img src="${cart.product.imageUrl}" 
                                    alt="Ourson ${cart.product.name}" class="card-img"></a></div>
                                    <figcaption class="info ml-3 mt-3">
                                        <a href="../pages/view-product.html?product_id=${cart.product._id}" class="text-primary h3">${cart.product.name}</a>
                                        <p class="text-muted" id="product_colors">Couleurs: ${cart.product.colors}</p>
                                    </figcaption>
                                </figure>
                            </td>
                            <td>
                                <input class="quantity form-control" data-test="0" type="number" id="product_quantity_${cart.product._id}" min="1" max="10" 
                                value="${cart.productsInCart[i][1]}">
                            </td>
                            <td>
                                <div class="price-wrap"> 
                                    <span  class="price text-primary h4" data-price-price="${cart.product.price}" id="product_price_${cart.product._id}">
                                    ${cart.product.price * cart.productsInCart[i][1]}€</br></span>
                                    <p class="text-muted">${cart.product.price}€/unité</p>
                                </div>
                            </td>
                                <td class="text-right">
                                <a href="" class="btn btn-danger btn_delete" data-delete-id="${cart.product._id}" data-delete-name="${cart.product.name}">Supprimer</a>
                            </td>
                        </tr>`;

        //On affiche les produits présent dans le panier seulement sur la page dédiée
        if (document.getElementById("display-cart") != null) {
            let displayCart = document.getElementById('display-cart');
            displayCart.innerHTML += cartCode;
        }
    }

    //Méthode qui permet de modifier le prix avec les quantity inputs
    modifyQuantity(quantity, i) {
        if (document.getElementById("total_price") != null && document.getElementById("final_price") != null) {
            cart.productsInCart[i][1] = quantity;
            localStorage.setItem('productsInCart', JSON.stringify(cart.productsInCart));
        }
    }

    //Méthode qui de modifier le prix du produit en fonction de sa quantité ce qui modifie la valeur finale du panier
    changeTotalProductPrice(totalProductPrice, i) {
        if (document.getElementById("total_price") != null && document.getElementById("final_price") != null) {
            let displayedProductPrice = document.getElementById('product_price_' + this.productsInCart[i][0]);
            displayedProductPrice.innerText = JSON.stringify(totalProductPrice) + "€";
        }
    }

    //Méthode qui nous permet de connaître le prix total du panier et le prix final après réduction si réduction il y a
    displayTotalPrice() {
        this.totalPrice = 0;
        for (let i = 0; i < this.productsInCart.length; i++) {
            let totalPriceDisplay = document.getElementById('total_price');

            let productQuantity = cart.productsInCart[i][1];
            let productPrice = cart.productsInCart[i][2];

            let totalProductPrice = productQuantity * productPrice;
            this.totalPrice += totalProductPrice;
            totalPriceDisplay.innerHTML = this.totalPrice + "€";
        }

        //Affichage du prix final avec réduction
        let finalPriceDisplay = document.getElementById('final_price');
        let reductionPriceDisplay = parseInt(document.getElementById('reduction_price').textContent.replace('€', '').replace('-', ''));

        finalPriceDisplay.innerHTML = `<strong>${this.totalPrice - reductionPriceDisplay}€</strong>`;
        localStorage.setItem('totalCartPrice', finalPriceDisplay.textContent)
    }

    //Méthode qui nous permet d'afficher un message pour signaler à l'utilisateur que son panier est vide
    displayEmptyCart() {
        let emptyCode =`<div class="card col-lg-8 col-md-12 col-sm-12 mb-3">
                            <div class="d-flex flex-column align-items-center text-center">
                                <h2 class="mt-5 text-info font-weight-bold text-uppercase">Votre panier est vide</h2>
                                <a href="../index.html" class="btn btn-info my-5 col-lg-8 col-md-12 col-sm-11 mb-3">Retourner à l'accueil</a>
                            </div>
                        </div>`;
                                

        if(document.getElementById('empty-cart') != null){
            let emptyCart = document.getElementById('empty-cart');
            emptyCart.classList.add('d-flex', 'justify-content-center');
            emptyCart.innerHTML =  emptyCode;
        }

        if(document.getElementById('order-display') != null){
            let emptyOrder = document.getElementById('order-display');
            emptyOrder.classList.add('d-flex', 'justify-content-center');
            emptyOrder.innerHTML = emptyCode;
        }
    }

    //Méthode qui nous permet de supprimer un produit du panier en cliquant sur un button grâce à son ID
    deleteProductInCart(id, name, y) {
        if (this.productsInCart[y][0] === id) {
            cart.productsInCart.splice(y, 1);
            localStorage.setItem("productsInCart", JSON.stringify(cart.productsInCart));
        }
        alert(`Le produit ${name} est supprimé de votre panier`);
    }

    //Méthode qui permet de vider le panier
    emptyCart() {
        if (document.getElementById('btn_SupprAll') != null) {
            let deleteAll = document.getElementById('btn_SupprAll');
            deleteAll.addEventListener('click', function () {
                localStorage.setItem('productsInCart', '[]');
            })
        }
    }
}