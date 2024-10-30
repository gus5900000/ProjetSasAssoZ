const openPaymentBtn = document.getElementById('openPaymentBtn');
const paymentModal = document.getElementById('paymentModal');
const confirmationModal = document.getElementById('confirmationModal');
const paymentForm = document.getElementById('paymentForm');
const closeButtons = document.getElementsByClassName('close');
const closeConfirmationBtn = document.getElementById('closeConfirmationBtn');
var BoxToRotate = {}

var PathToFunc = {
    "main.html": function () {
        Main_Page_Anim();
    },
    "shop.html": function () {
        Main_Shop();
    },
    "inventaire.html": function () {
        Inventory_Main();
    },
    "formulaire.html": function () {
        ModalLoad();
    },
    "paiementtest.html": function () {
        ModalLoad();
    }
}

// Écouteur d'événement pour la touche "m"
document.addEventListener('keydown', function (event) {
    if (event.key.toLowerCase() === 'm') {
        fillForm("paiement");
    } else if (event.key.toLowerCase() === 'ù') {
        fillForm("ship")
    }
});

function fillForm(whoForm) {
    if (whoForm === "paiement") {
        document.getElementById('name').value = "Corentin Marliere";
        document.getElementById('email').value = "cocopes@gmail.com";
        document.getElementById('card-number').value = "4974 8394 3693 1377";
        document.getElementById('expiry-date').value = "11/2025";
        document.getElementById('cvv').value = "353";
    } else if (whoForm === "ship") {
        document.getElementById('nameShip').value = "Corentin Marliere";
        document.getElementById('adress').value = "101 Rue de l'Hôpital Militaire, 59800 Lille";
        document.getElementById('phone').value = "06 40 37 35 61";
    }
}

// Cursor style

const cursor = document.getElementById('cursor');
let isClicked = false;

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    isClicked = true;
    updateCursorStyle();
});

document.addEventListener('mouseup', () => {
    isClicked = false;
    updateCursorStyle();
});

function updateCursorStyle() {
    if (isClicked) {
        cursor.style.width = '2.5rem';
        cursor.style.height = '2.5rem';
        cursor.style.opacity = '1';
    } else {
        cursor.style.width = '2rem';
        cursor.style.height = '2rem';
        cursor.style.opacity = '0.2';
    }
}

// Permet de mettre en surbrillance la page ou on se situe 
document.addEventListener('DOMContentLoaded',
    function () {
        const currentPage = window.location.pathname.split("/").pop();
        const navItems = document.querySelectorAll('.nav-link')

        navItems.forEach(item => {
            if (item.getAttribute('href') === currentPage) {
                item.classList.add('active');
            }
        });
    });

// Permet d'ajouter la class dark-mode au body
function darkMode() {
    let element = document.body;
    element.classList.toggle("dark-mode");
}

function ModalLoad() {
    const modal = document.getElementById("myModal");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.querySelector(".close");

    openModalBtn.onclick = function () {
        modal.style.display = "flex";
    }

    closeModalBtn.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


// Fonction qui permet de remonter en haut de la page
let mybutton = document.getElementById("btnTop");

// Appel la fonction quand on commence à scroll
window.onscroll = function () {
    scrollFunction()
};

// Affiche le bouton quand on a scrollé
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// Permet de retourner en haut de la page
function topFunction() {
    document.documentElement.scrollTop = 0;
}

function Main_Page_Anim() {
    //console.log("ANIMATION LAUNCHED")
    var MainLogo = document.getElementById("logolololol")
    //console.log(MainLogo)
    PopImage("logolololol", "600px", "200px", 8)
}

function Main() {
    // ManagePage to do OneJS_File
    darkMode();
    for (var k in PathToFunc) {
        if (window.location.href.includes(k)) {
            PathToFunc[k]();
        }
    }
}

// CrateElementInShop
function Main_Shop() {
    //console.log("Indexing Main Shop page JS.")
    const modal = document.getElementById("myModal");
    modal.style.display = "none"

    fetch("../data/shops.json")
        .then(response => response.json())
        .then(data => {
            CreateProductsBox(data);
        })
}

function CreateProductsBox(JsonData) {
    const boutiqueContainer = document.getElementById("boutique");
    var SelectedBoxxxx = {}

    JsonData.mystery_boxes.forEach(box => {
        const boxElement = document.createElement("div");
        boxElement.onmouseover = function () {
            RotateAndPopImage(box.type + "_box", "250px", "250px")
        }
        boxElement.classList.add("mystery-box");

        const boxImage = document.createElement("img");
        boxImage.src = box.UrlImage;
        boxImage.alt = `${box.type} Box`;
        boxImage.id = box.type + "_box"
        boxElement.appendChild(boxImage);

        const productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        const detailsTitle = document.createElement("h3");
        detailsTitle.textContent = `Contenu de la boîte ${box.type}`;
        productDetails.appendChild(detailsTitle);

        const productsList = document.createElement("ul");
        const ProductBuyButton = document.createElement("button");
        // MODALE PAIEMENT
        ProductBuyButton.onclick = function () {
            SelectedBoxxxx = box
            console.log("Redefined")
            console.log(SelectedBoxxxx)
            document.getElementById("BoxToOrder").textContent = "Caisse " + box.type
            paymentModal.style.display = 'block';
            document.getElementById("PriceToOrder").textContent = box.price + "€";
            document.getElementById("PriceTotal").textContent = box.price + "€";
        }

        paymentForm.onsubmit = function (e) {
            e.preventDefault();
            paymentModal.style.display = 'none';
            confirmationModal.style.display = 'block';
        }

        closeConfirmationBtn.onclick = function () {
            console.log("Box Selected" + SelectedBoxxxx.type)
            confirmationModal.style.display = 'none';
            BuyItems(SelectedBoxxxx);
        }

        window.onclick = function (event) {
            if (event.target == paymentModal) {
                paymentModal.style.display = 'none';
            }
            if (event.target == confirmationModal) {
                confirmationModal.style.display = 'none';
            }
        }

        for (let i = 0; i < closeButtons.length; i++) {
            closeButtons[i].onclick = function () {
                paymentModal.style.display = 'none';
                confirmationModal.style.display = 'none';
            }
        }
        // MODALE PAIEMENT

        ProductBuyButton.style.backgroundColor = "#3d3d3d";
        ProductBuyButton.style.color = "white";
        ProductBuyButton.style.padding = "12px 24px";
        ProductBuyButton.style.marginTop = "10px";
        ProductBuyButton.style.borderRadius = "8px";
        ProductBuyButton.style.fontSize = "18px";
        ProductBuyButton.style.border = "none";
        ProductBuyButton.style.cursor = "pointer";
        ProductBuyButton.style.display = "inline-flex";
        ProductBuyButton.style.alignItems = "center";
        ProductBuyButton.style.justifyContent = "center";
        ProductBuyButton.style.transition = "background-color 0.2s ease-in-out";
        ProductBuyButton.style.fontWeight = "600";
        ProductBuyButton.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";

        const icon = document.createElement("span");
        icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
        `;

        ProductBuyButton.appendChild(icon);
        ProductBuyButton.appendChild(document.createTextNode("Acheter maintenant"));

        box.products.forEach(product => {
            const productItem = document.createElement("li");
        
            productItem.textContent = `${product.name} (${product.category}) - ${product.value}€ - `;
            
            const productLink = document.createElement("a");
            productLink.href = product.UrlImage;
            productLink.textContent = "Voir l'image";
            productLink.target = "_blank"; 
        
            productItem.appendChild(productLink);
            productsList.appendChild(productItem);
        });
        
        productDetails.appendChild(productsList);
        productDetails.appendChild(ProductBuyButton);

        boxElement.appendChild(productDetails);

        boutiqueContainer.appendChild(boxElement);
    });
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function BuyItems(box) {
    console.log(box)
    // Sound Roulette
    const AudioRoulette = document.getElementById('soundroulette')
    AudioRoulette.play()

    setTimeout(function () {
        //console.log(box)
        const modal = document.getElementById("myModal");
        const ImgToGo = document.getElementById("RandomSrcImg")
        modal.style.display = "flex";
        ImgToGo.style.marginLeft = "14%"
        ImgToGo.style.marginRight = "auto"
        var TimeToGo = 0
        var DisplayImgNum = 0
        var Pass = 0
        var RandomWin = Math.round(randomNumber(30, 40))
        var BoucleOgo = setInterval(function () {
            //console.log("Start Algo (Random : " + RandomWin + ", Passed : " + Pass + ")");
            if (RandomWin >= Pass) {
                //console.log("Passed");
                Pass++;

                //console.log("New Random img : " + box.products[DisplayImgNum].UrlImage);
                ImgToGo.src = box.products[DisplayImgNum].UrlImage;
                var TextForWin = document.getElementById("WinMsg")
                TextForWin.textContent = box.products[DisplayImgNum].name;
                TextForWin.marginTop = "100px"
                TextForWin.style.marginLeft = "14%"
                TextForWin.style.marginRight = "auto"

                DisplayImgNum++;

                //console.log(DisplayImgNum + " " + Object.keys(box.products).length);

                if (DisplayImgNum >= Object.keys(box.products).length) {
                    //console.log("Pass to 0");
                    DisplayImgNum = 0;
                }
            } else {
                ImgToGo.src = box.products[DisplayImgNum].UrlImage;
                //console.log("You win " + box.products[DisplayImgNum].name)
                //console.log("Algo has been stopped.");

                AudioRoulette.pause();
                // Sound Tada
                const AudioTada = document.getElementById('soundtada')
                AudioTada.play()
                var TextForWin = document.getElementById("WinMsg")

                // Ajout de l'item gagné dans la base Airtable
                postAirtable(box.products[DisplayImgNum])


                const paymentModalShip = document.getElementById('myModalShip');
                const confirmationModalShip = document.getElementById('confirmationModalShip');
                const paymentFormShip = document.getElementById('paymentFormShip');


                TextForWin.textContent = "\nBravo, vous avez gagné !\nLot gagné : " + box.products[DisplayImgNum].name + " d'une valeur de " + box.products[DisplayImgNum].value + "€ !";
                TextForWin.marginTop = "100px"
                TextForWin.style.marginLeft = "14%"
                TextForWin.style.marginRight = "auto"
                const ShipInfoetc = document.getElementById("ShipInfoetc")
                const ShipButton = document.createElement("button");
                ShipButton.onclick = function () {
                    modal.style.display = "none";
                    paymentModalShip.style.display = 'block';
                    var CheckoutRecap = document.getElementById("CheckoutRecap")
                    CheckoutRecap.innerHTML = "<h2>• " + box.products[DisplayImgNum].name + " " + (box.products[DisplayImgNum].value + "€").strike() + " 0.00€" + "</h2>"
                }

                paymentFormShip.onsubmit = function (e) {
                    e.preventDefault();
                    paymentModalShip.style.display = 'none';
                    confirmationModalShip.style.display = 'block';
                }

                paymentFormShip.onsubmit = function (e) {
                    e.preventDefault();
                    paymentModalShip.style.display = "none";
                    confirmationModalShip.style.display = "block";

                    setTimeout(function () {
                        var DeliveryImg = document.getElementById("DeliverySource")
                        DeliveryImg.src = "/asset/check.gif"
                        setTimeout(function(){
                            confirmationModalShip.style.display = "none";
                        }, 4000)
                    }, 4000);
                }


                ShipButton.textContent = "Livrée chez moi des maintenant !"
                ShipButton.style.backgroundColor = "#3d3d3d";
                ShipButton.style.color = "white";
                ShipButton.style.padding = "12px 24px";
                ShipButton.style.marginTop = "10px";
                ShipButton.style.borderRadius = "8px";
                ShipButton.style.fontSize = "18px";
                ShipButton.style.border = "none";
                ShipButton.style.cursor = "pointer";
                ShipButton.style.display = "inline-flex";
                ShipButton.style.alignItems = "center";
                ShipButton.style.justifyContent = "center";
                ShipButton.style.transition = "background-color 0.2s ease-in-out";
                ShipButton.style.fontWeight = "600";
                ShipButton.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
                ShipInfoetc.appendChild(ShipButton);

                clearInterval(BoucleOgo);

            }
        }, 100);
    }, 200)
    // //console.log("Called")
    // //console.log("Ask to buy " + ProductName, ProductCategory, ProductPrice)
}

// Inventory
function Inventory_Main() {
    //console.log("Indexing invetory page JS.")
    
}

// Pop & Rotate // TODO

function PopImage(ImageSrc, ImageSizeX, ImageSizeY, PopMuch = 3) {
    var Image = document.getElementById(ImageSrc)
    var BaseHeight = ImageSizeY
    var BaseWidth = ImageSizeX
    var AlreadyGranded = false
    var PopCount = 0
    //console.log("Base : " + BaseHeight + " | " + BaseWidth)
    var IntervalPop = setInterval(function () {
        PopCount++;
        if (!AlreadyGranded) {
            //console.log("Poped")
            var ImageSizeToNumWidth = Number(BaseWidth.replace("px", ""))
            var CalculedSizeWidth = ImageSizeToNumWidth + 20

            var ImageSizeToNumHeight = Number(BaseHeight.replace("px", ""))
            var CalculedSizeHeight = ImageSizeToNumHeight + 20

            Image.style.height = CalculedSizeHeight + "px";
            Image.style.width = CalculedSizeWidth + "px";
            AlreadyGranded = true;
        } else {
            //console.log("UnPoped")
            Image.style.height = BaseHeight
            Image.style.width = BaseWidth
            AlreadyGranded = false;
            if (PopCount >= PopMuch) {
                clearInterval(IntervalPop)
            }
        }
    }, 300)
}

function RotateAndPopImage(ImageSrc, ImageSizeX, ImageSizeY) {
    if (!BoxToRotate[ImageSrc]) {
        BoxToRotate[ImageSrc] = true;
        var Dg = 0

        var FakeInterval = setInterval(function () {
            Dg = Dg + 1
            var Image = document.getElementById(ImageSrc)
            Image.style.rotate = Dg + "deg"
            if (Dg == 360) {
                clearInterval(FakeInterval);
                PopImage(ImageSrc, ImageSizeX, ImageSizeY);
                setTimeout(function () {
                    BoxToRotate[ImageSrc] = false;
                }, 5000)
            }
        }, 1)
    }
}


async function postAirtable(item) {
    let apiKey = ""
    let urlAPI = "https://api.airtable.com/v0/app1tMLBNyqLrKa1r/lots"
    //console.log(item)
    let data = {
        "records": [
            {
                "fields": {
                    "rarete_caisse": item.category,
                    "nom_lot": item.name,
                    "photo_lot": item.UrlImage,
                    "prix": item.value
                }
            }
        ]
    }
    try {
        const reponse = await fetch(urlAPI, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        //console.log("Item ajouté à la base AirTable")
        return reponse
    } catch (erreur) {
        console.error('Erreur:', erreur)
        return null
    }
}



Main();