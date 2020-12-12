class Ajax {
    constructor(url) {
        this.url = url;
    }

    getResponse = async function () {
        let response = await fetch(this.url);
        if (response.ok) {
            return response.json();
        } else {
            console.error("Error : ", response.status);
        }
    }

    sendOrder = async function (orderDatas) {
        let order = await fetch("http://localhost:3000/api/teddies/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: orderDatas
        })

        if (order.ok) {
            return order.json();
        } else {
            console.log("Error : ", order.json());
        }
    }
}







