class Order {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem("productsInCart"));
        this.product;
        this.userInfosArray = [];
        this.productArray = [];
        this.totalPrice = 0;
        this.initialize();
    }

    //Méthode qui se lance à la création de la classe
    initialize() {
        if (localStorage.length > 0) {
            for (let i = 0; i < this.cart.length; i++) {
                let ajaxResponse = new Ajax('http://localhost:3000/api/teddies/' + this.cart[i][0]);

                ajaxResponse.getResponse().then(data => {
                    order.product = data;
                }).then(function () {
                    order.displayCart(i);
                }).then(function () {
                    if (document.getElementById('recap-order') != null) {
                        order.recapOrder(i);
                        setTimeout(() => {
                            order.clearCart();
                        }, 1000);
                    }
                }).catch(error => {
                    console.error(error);
                })
            }

            if (document.getElementById('btn_purshase') != null) {
                let purshaseBtn = document.getElementById('btn_purshase');
                purshaseBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    order.retrieveUserInfos();
                });
            }
        }
    }

    //Méthode qui nous permet d'afficher les articles que l'utilisateur a dans son panier
    displayCart(i) {
        let cartToOrderCode = `<div class="col-lg-5 product-card my-2">
                                    <div class="card">
                                        <a id="" href="../pages/view-product.html?product_id=${order.product._id}"><img src="${order.product.imageUrl}" class="card-img-top" alt="Ourson ${order.product.name}"></a>
                                        <div class="card-body">
                                            <h4 class="card-title d-flex justify-content-center">
                                                <a class="product_name" class="text-info" href="../pages/view-product.html?product_id=${order.product._id}""><strong>${order.product.name}</strong></a>
                                            </h4>
                                            <span class="price text-muted h5 d-flex justify-content-center">${this.cart[i][1]} x ${order.product.price}€ = ${this.cart[i][1]*order.product.price}€</span>
                                        </div>
                                    </div>
                                </div>`;

        //let codeIfCartEmpty = `<h2 class="mt-3">Votre panier est vide</h2>`;

        if (document.getElementById('cart-to-order') != null) {
            let displayCart = document.getElementById('cart-to-order');
            displayCart.innerHTML += cartToOrderCode;

            this.productArray.push(order.product._id);

            let totalPriceDisplay = document.getElementById('totalCartPrice');
            let priceToDisplay = localStorage.getItem('totalCartPrice');
            totalPriceDisplay.innerHTML = `<span class="h3 text-info"><strong>${priceToDisplay}</strong></span>`;
        }
    }

    //Méthode qui nous permet de récupèrer les informations de l'utilisateur passées dans le formulaire de contact/livraison
    retrieveUserInfos() {
        let formInputs = document.getElementsByTagName('input');
        for (let i = 1; i < formInputs.length; i++) {
            if (this.userInfosArray.length === 0 || this.userInfosArray.length > 0) {
                this.userInfosArray.push(formInputs[i].value)
            }
        }

        if(this.userInfosArray[0] === '' || this.userInfosArray[1] === '' || this.userInfosArray[2] === '' || this.userInfosArray[3] === '' || this.userInfosArray[4] === ''){
            alert('Vous devez remplir le formulaire de contact !');
            window.location.reload();
        } else {
            this.createOrder(this.userInfosArray);
            setTimeout(() => {
                window.location.replace('recap-order.html');
            },100)
        }
    }

    //Méthode qui nous permet de créer une commande en l'envoyant à l'API et ensuite on récupère sa réponse
    createOrder(userInfo) {
        let orderDatas = {
            contact: {
                firstName: userInfo[0],
                lastName: userInfo[1],
                email: userInfo[2],
                city: userInfo[3],
                address: userInfo[4]
            },
            products: this.productArray
        }
        let ajaxOrder = new Ajax();
        ajaxOrder.sendOrder(JSON.stringify(orderDatas)).then(response => {
            console.log(response);
            localStorage.setItem('order', JSON.stringify(response));
        });
        return order;
    }

    //Méthode qui nous permet, depuis la réponse de l'API après la commande, de résumé les informations à l'utilisateur (articles, adresse de livraison ...)
    recapOrder(i) {
        let orderInfosRecapDisplay = document.getElementById('recap-order');
        let productsInfoRecapDisplay = document.getElementById('products-recap-order');

        let productNumberDisplay = document.getElementById('product-number');
        productNumberDisplay.innerHTML = `<span class="h4 text-info"><strong>${this.cart.length}</strong></span>`;

        let productsTotalPriceDisplay = document.getElementById('totalCartPrice');
        let productsTotalPriceLS = localStorage.getItem('totalCartPrice');
        productsTotalPriceDisplay.innerHTML = `<span class="h3 text-info"><strong>${productsTotalPriceLS}</strong></span>`;

        let orderInfos = JSON.parse(localStorage.getItem('order'));
        let orderIdDisplay = document.getElementById('orderId-display');
        orderIdDisplay.innerHTML = `Votre commande (<strong>${orderInfos.orderId}</strong>)`;

        let recapCode = `<div class="alert alert-warning d-flex flex-column align-items-center my-5 col-lg-10 col-md-10 col-sm-10 col-12" role="alert">
                            <p><strong>${orderInfos.contact.firstName} ${orderInfos.contact.lastName.toUpperCase()}</strong>, Merci pour votre commande !</p>
                            <p>Adresse de livraison : <strong>${orderInfos.contact.address}, ${orderInfos.contact.city}</strong></p>
                            <p>Retrouvez les informations de votre commande sur : <strong>${orderInfos.contact.email}</strong></p>
                        </div>`;
        orderInfosRecapDisplay.innerHTML = recapCode;

        let productsRecapCode = `<div class="col-lg-5 product-card my-2">
                                        <div class="card">
                                            <a id="" href="view-product.html?product_id=${orderInfos.products[i]._id}"><img src="${orderInfos.products[i].imageUrl}" class="card-img-top" alt="Ourson ${orderInfos.products[i].name}"></a>
                                            <div class="card-body">
                                                <h4 class="card-title d-flex justify-content-center">
                                                    <a class="product_name" class="text-info" href="../pages/view-product.html?product_id=${orderInfos.products[i]._id}""><strong>${orderInfos.products[i].name}</strong></a>
                                                </h4>
                                                <span class="price text-muted h5 d-flex justify-content-center">${this.cart[i][1]} x ${order.product.price}€ = ${this.cart[i][1]*order.product.price}€</span>
                                            </div>
                                        </div>
                                    </div>`;
        productsInfoRecapDisplay.innerHTML += productsRecapCode;
    }

    //Méthode qui supprime le panier de l'utilisateur après sa commande
    clearCart() {
        localStorage.clear();
    }
}