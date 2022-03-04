let cart = []; //Create an empty array that we will use to store all the Fruit or Vegetable objects created.

// Logic used for both the Catalogue and Cart Pages

// Booleans used to determine whether we need to build the delivery/collection form for the first time or just hide/show
let collectionCity = false;
let deliveryRadio = false;

$(document).ready(function () {
    loadCart();

    if (document.getElementById("catalogue") !== null || document.getElementById("cart") !== null) {
        initializeFruitsAndsVegetables();
    }

    // Since both the Catalogue and Cart pages use mostly the same functions, we differentiate certain logics by getting the ID of the Cart body

    // If the user is in the Cart page, make the fruit and vegetable totals available for use
    if (document.getElementById("cart") !== null) {
        var fruitPrice = Number(
            document.getElementById("totalFruitCost").textContent
        );
        var vegetablePrice = Number(
            document.getElementById("totalVegetableCost").textContent
        );
    }

    // jQuery event listener for clicking on an element with type radio
    $(":radio").click(function (e) {
        // If the Collection option is chosen, build or show the rest of the collection form
        if (e.target.id === "collectionRadio") {
            // Re-enable the checkout button
            document.getElementById("checkoutButton").disabled = false;

            // Reset the totals for fruits and vegetables back to their original value
            document.getElementById("totalFruitCost").textContent = fruitPrice;
            document.getElementById("totalVegetableCost").textContent =
                vegetablePrice;

            // If collectionCity is false, build the collection form for the first time
            if (!collectionCity) {
                // Hide the delivery form before building the collection form
                $("#deliveryForm").hide();

                /* <div class="form-group" id="cityCollectionRadioGroup" style="">
                                    <label class="h5">Please select a city you'd like to collect from:</label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="collectionCityRadio" id="radioCollectionDurban"
                                            value="option1">
                                        <label class="form-check-label" for="radioCollectionDurban">Durban</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="collectionCityRadio" id="radioCollectionJohannesburg"
                                            value="option2">
                                        <label class="form-check-label" for="radioCollectionJohannesburg">Johannesburg</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="collectionCityRadio" id="radioCollectionCape Town"
                                            value="option3">
                                        <label class="form-check-label" for="radioCollectionCape Town">Cape Town</label>
                                    </div>
                                </div> */
                // The code below creates a form that resembles the above

                let collectionGroup = document.createElement("div");
                collectionGroup.setAttribute("class", "form-group");
                collectionGroup.id = "cityCollectionRadioGroup";

                let collectionGroupLabel = document.createElement("label");
                collectionGroupLabel.textContent =
                    "Please select a city you'd like to collect from:";
                collectionGroupLabel.setAttribute("class", "h5");
                collectionGroup.appendChild(collectionGroupLabel);

                // Cities available for collection
                let cities = ["Durban", "Johannesburg", "Cape Town"];
                cities.forEach((city) => {
                    let formCheck = document.createElement("div");
                    formCheck.setAttribute("class", "form-check");

                    let input = document.createElement("input");
                    input.setAttribute("class", "form-check-input");
                    input.type = "radio";
                    input.name = "collectionCityRadio";
                    input.id = "radioCollection" + city;
                    input.value = "option" + (cities.indexOf(city) + 1);

                    let label = document.createElement("label");
                    label.setAttribute("class", "form-check-label");
                    label.setAttribute("for", input.id);
                    label.textContent = city;

                    formCheck.appendChild(input);
                    formCheck.appendChild(label);
                    collectionGroup.appendChild(formCheck);
                });

                // Insert after the collectionDeliveryRadio group but before the Checkout button
                $(collectionGroup).insertAfter(e.target.parentElement.parentElement);
                // Set collectionCity to true so that the collection form is not built everytime
                collectionCity = true;
            } else {
                // If the collection form has already been built, hide the delivery form and show the collection form
                $("#deliveryForm").hide();

                $("#cityCollectionRadioGroup").show();
            }
            // If the Delivery option is chosen, build or show the rest of the delivery form
        } else if (e.target.id === "deliveryRadio") {
            // Re-enable the checkout button
            document.getElementById("checkoutButton").disabled = false;

            // Modify the totals for fruits and vegetables to account for delivery cost
            document.getElementById("totalFruitCost").textContent = fruitPrice + 10;
            document.getElementById("totalVegetableCost").textContent =
                vegetablePrice + 10;

            // If deliveryRadio is false, build the delivery form for the first time
            if (!deliveryRadio) {
                // Hide the collection form before building the delivery form
                $("#cityCollectionRadioGroup").hide();

                /* <div id="deliveryForm" style="">
                                  <label class="h5">Please Enter Your Delivery Address:</label>
                                  <div class="form-row">
                                    <div class="form-group col-md-6">
                                      <label for="radioDeliveryAddress">Address</label>
                                      <input class="form-control" type="text" id="radioDeliveryAddress" placeholder="Address">
                                    </div>
                                    <div class="form-group col-md-6">
                                      <label for="radioDeliverySuburb">Suburb</label>
                                      <input class="form-control" type="text" id="radioDeliverySuburb" placeholder="Suburb">
                                    </div>
                                    <div class="form-group col-md-6">
                                      <label for="radioDeliveryCity/Town">City/Town</label>
                                      <input class="form-control" type="text" id="radioDeliveryCity/Town" placeholder="City/Town">
                                    </div>
                                    <div class="form-group col-md-6">
                                      <label for="radioDeliveryPostal Code">Postal Code</label>
                                      <input class="form-control" type="number" id="radioDeliveryPostal Code" placeholder="Postal Code">
                                    </div>
                                  </div>
                                </div> */
                // The code below creates a form that resembles the above

                let deliveryForm = document.createElement("div");
                deliveryForm.id = "deliveryForm";

                let deliveryFormLabel = document.createElement("label");
                deliveryFormLabel.setAttribute("class", "h5");
                deliveryFormLabel.textContent = "Please Enter Your Delivery Address:";
                deliveryForm.appendChild(deliveryFormLabel);

                let deliveryFormRow = document.createElement("div");
                deliveryFormRow.setAttribute("class", "form-row");
                let inputElements = ["Address", "Suburb", "City/Town", "Postal Code"];

                for (let j = 0; j < inputElements.length; j++) {
                    let deliveryGroup = document.createElement("div");
                    deliveryGroup.setAttribute("class", "form-group col-md-6");

                    let input = document.createElement("input");
                    input.setAttribute("class", "form-control");
                    // Set the type of the Postal code input to number
                    if (inputElements[j] === "Postal Code") {
                        input.type = "number";
                    } else {
                        input.type = "text";
                    }
                    input.id = "radioDelivery" + inputElements[j];
                    input.placeholder = inputElements[j];

                    let label = document.createElement("label");
                    label.textContent = inputElements[j];
                    label.setAttribute("for", input.id);

                    deliveryGroup.appendChild(label);
                    deliveryGroup.appendChild(input);

                    deliveryFormRow.appendChild(deliveryGroup);

                    deliveryForm.appendChild(deliveryFormRow);
                }

                // Insert after the collectionDeliveryRadio group but before the Checkout button
                $(deliveryForm).insertAfter(e.target.parentElement.parentElement);
                // Set deliveryRadio to true so that the delivery form is not built everytime
                deliveryRadio = true;
            } else {
                // If the delivery form has already been built, hide the collection form and show the delivery form
                $("#cityCollectionRadioGroup").hide();
                $("#deliveryForm").show();
            }
        }
    });

    // jQuery event for clicking on the checkout button
    $("#checkoutButton").click(function (e) {
        // Boolean to determine if the collection/delivery form has been completed
        let completed = true;

        // If the collection form has not been built or is hidden, loop through the delivery form and make sure every input is not empty
        if (
            $("#cityCollectionRadioGroup").length === 0 ||
            $("#cityCollectionRadioGroup").css("display") === "none"
        ) {
            $("input[id*='radioDelivery']").each(function (element) {
                if (this.value === "") {
                    // Set 'completed' to false as the form is not completed
                    completed = false;
                }
            });
            // If the delivery form has not been built or is hidden, loop through the collection form and make sure at least one radio input is checked
        } else if (
            $("#deliveryForm").length === 0 ||
            $("#deliveryForm").css("display") === "none"
        ) {
            $("input[id*='radioCollection']").each(function (element) {
                if (this.checked === true) {
                    // Set 'completed' to true if at least one radio button in the collection form is clicked
                    completed = true;
                    return false; // Return false to break out of the jQuery each() loop
                } else {
                    completed = false;
                }
            });
        }

        // Final check to either complete the order with a reference or alert the user to complete the rest of the form
        if (completed) {
            alert(
                "Your order was completed. Here is your reference number: " +
                generateReference()
            );
        } else {
            alert("Please complete the collection/delivery form");
        }
    });

    // jQuery event for clicking on the discount button
    $("#discountButton").click(function (e) {
        // Boolean to determine if the discount input has been completed
        let completed = true;
        // If the discount input is empty, set 'completed' to false
        if (e.target.textContent === "") {
            completed = false;
        }

        // If the discount input is not empty, get the code in the input and change the total price accordingly, if possible
        if (completed) {
            // Get the discount code entered by the user
            let code = document.getElementById("inputDiscount").value;

            if (isDiscountCodeValid(code) === "FRUITS10") {
                // This code reduces the total price of the fruits by 10
                document.getElementById("totalFruitCost").textContent = fruitPrice - 10;
            } else if (isDiscountCodeValid(code) === "VEGETABLES10") {
                // This code reduces the total price of the vegetables by 10
                document.getElementById("totalVegetableCost").textContent =
                    fruitPrice - 10;
            } else if (isDiscountCodeValid(code) === "CART10") {
                // This code reduces the total price of the fruits and vegetables by 10
                document.getElementById("totalFruitCost").textContent = fruitPrice - 10;
                document.getElementById("totalVegetableCost").textContent =
                    fruitPrice - 10;
            } else {
                alert("Invalid discount code entered");
            }
        } else {
            alert("No discount code entered");
        }
    });

    // The functions below cover most of the jQuery functionality

    // Click on the "How would you like to be contacted? ⌄" button on the contact page
    $("#contact-options").click(function (e) {
        // If the Email and Phone buttons are visible, animate them 45 pixels and 85 pixels, respectively,  up from the bottom slowly
        if (
            $("#email").css("bottom") === "0px" &&
            $("#phone").css("bottom") === "0px"
        ) {
            $("#email").animate(
                {
                    bottom: "45",
                },
                "slow"
            );
            $("#phone").animate(
                {
                    bottom: "85",
                },
                "slow"
            );
            // Set the z-index of the buttons so they are hidden behind the #contact-options button
            $("#email").css("z-index", -1);
            $("#phone").css("z-index", -1);
            // Slide the dropdown up to hide the whitespace
            $(".option-dropdown").slideUp(500);
        } else {
            // Slide the dropdown dow to show the buttons within
            $(".option-dropdown").slideDown(500);
            // If the Email and Phone buttons are invisible, animate them to sit at their default positions and 
            // give them a z-index of 1 so they may be clickable
            $("#email").animate(
                {
                    bottom: "0",
                    "z-index": 1,
                },
                "slow"
            );
            $("#phone").animate(
                {
                    bottom: "0",
                    "z-index": 1,
                },
                "slow"
            );
        }
    });

    // If the Email button is clicked, show the Email input and hide the Phone input
    $("#email").click(function (e) {
        $("#phone-group").hide();
        $("#email-group").show();
    });

    // If the Phone button is clicked, show the Phone input and hide the Email input
    $("#phone").click(function (e) {
        $("#email-group").hide();
        $("#phone-group").show();
    });
});

/* When the page loads, we check to see whether it is the first time we are
loading this page or not. If it is the first time we are loading the page,
we initialise the values we want to store in sessionStorage. If it is not the
first time we are loading the page, then we can assume that we already have some information
about fruit/vegetable objects stored in SessionStorage. We use this information in sessionStorage to add information 
about each fruit/vegetable object we have created to our HTML page. */
function loadCart() {
    // Get the number of items in the cart element from the nav bar
    let cartCount = document.getElementById("cart-count");

    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        sessionStorage.setItem("cart", JSON.stringify(cart));
        sessionStorage.setItem("hasCodeRunBefore", true);
    } else {
        cart = JSON.parse(sessionStorage.getItem("cart")); //Get the array of fruit/vegetable objects from sessionStorage and assign it to the array 'cart'
        // Display the amount of items in the cart on the nav bar
        cartCount.textContent = cart.length;
    }
}

// The constructor function that will be used to create all Fruit objects.
function Fruit(name, price, imageSrc) {
    this.name = name;
    this.price = price;
    this.imageSrc = imageSrc;
}
// The constructor function that will be used to create all Vegetable objects.
function Vegetable(name, price, imageSrc) {
    this.name = name;
    this.price = price;
    this.imageSrc = imageSrc;
}

// Initialize the different Fruit and Vegetable objects
// Add the Fruit and Vegetable objects to an array and load the cart or catalogue page
function initializeFruitsAndsVegetables() {
    let apple = new Fruit("Apple", "20", "../images/apple.jpg");
    let banana = new Fruit("Banana", "25", "../images/banana.jpg");
    let orange = new Fruit("Orange", "30", "../images/orange.jpg");
    let pomegranate = new Fruit("Pomegranate", "100", "../images/pomegranate.jpg");
    let watermelon = new Fruit("Watermelon", "50", "../images/watermelon.jpg");

    let tomato = new Vegetable("Tomato", "30", "../images/tomato.jpg");
    let cucumber = new Vegetable("Cucumber", "15", "../images/cucumber.png");
    let lettuce = new Vegetable("Lettuce", "25", "../images/lettuce.jpg");
    let pepper = new Vegetable("Pepper", "35", "../images/pepper.jpg");
    let broccoli = new Vegetable("Broccoli", "40", "../images/broccoli.jpg");

    let arrayOfProducts = [
        apple,
        banana,
        orange,
        pomegranate,
        watermelon,
        tomato,
        cucumber,
        lettuce,
        pepper,
        broccoli,
    ];

    // Since both the Catalogue and Cart pages use mostly the same functions, we differentiate which to load by getting the ID of the Cart body if it exists on the page
    if (document.getElementById("cart") === null) {
        loadFruitsAndVegetablesToPage(arrayOfProducts);
    } else {
        loadCartProducts(arrayOfProducts);
    }
}

// Logic used for only the Cart Page

// This function generates a random string of characters as a reference for a checkout
function generateReference() {
    let result = ""; // String to return
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Characters to build the string out of
    let charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        // Loop though 10 times to get a string with a length of 10 characters
        // Concatenate a character over every iteration of the loop
        result = result.concat(
            characters.charAt(Math.floor(Math.random() * charactersLength)) // Multiply by charactersLength to get a value equal to or greater than 1
        );
    }
    return result;
}

// This function checks if a given string is a valid discount code
function isDiscountCodeValid(discountCode) {
    let possibleDiscounts = ["FRUITS10", "VEGETABLES10", "CART10"]; // Valid discount codes
    let valid = "";
    possibleDiscounts.forEach((code) => {
        if (code === discountCode) {
            valid = code;
        }
    });
    // Return the valid code for use
    return valid;
}

// This function loads the cart page dynamically
function loadCartProducts(arrayOfProducts) {
    // Initialise the total costs of fruits and vegetables
    let totalFruitCost = 0;
    let totalVegetableCost = 0;

    arrayOfProducts.forEach((product) => {
        // Get the cart from the session storage
        cart = JSON.parse(sessionStorage.getItem("cart"));

        // Count how many of each item is in the cart, e.g. 4 Apples
        let productTotal = 0;
        cart.forEach((item) => {
            if (item.name === product.name) {
                productTotal = productTotal + 1;
            }
        });

        // Create a table data cell to store the image and information of the product
        let td = document.createElement("td");
        td.setAttribute("class", "border rounded item");
        // For each of the products, we create an image element that will display the product's image.
        let productImg = document.createElement("img");
        productImg.src = product.imageSrc;
        productImg.alt = product.name;
        productImg.setAttribute("class", "img-thumbnail shadow");
        productImg.style.height = "120px";
        productImg.style.width = "200px";

        // Calculate the totalCost of the individual product
        let totalCost = productTotal * Number(product.price);

        let productP = document.createElement("p");
        productP.innerHTML =
            product.name +
            "<br/>" +
            "Price per Kg: R" +
            product.price +
            "<br/>" +
            "In cart: " +
            productTotal +
            "<br/>" +
            "Total cost: R" +
            totalCost;

        let tr;
        // Depending on the type of object (Fruit/Vegetable) use either the fruit table row or the vegetable table row
        // And add its cost to the total cost of either Fruits or Vegetables
        if (product.constructor.name === "Fruit") {
            tr = document.getElementById("fruit-row");
            totalFruitCost += totalCost;
        } else {
            tr = document.getElementById("vegetable-row");
            totalVegetableCost += totalCost;
        }

        td.appendChild(productImg);
        td.appendChild(document.createElement("hr"));
        td.appendChild(productP);

        tr.appendChild(td);
    });

    // Set the total cost respectively to either the Fruit or Vegetable cart
    let fruitCart = document.getElementById("fruit-cart");
    fruitCart.innerHTML =
        "Total cost for fruits: R" +
        '<label id="totalFruitCost" style="display: initial;">' +
        totalFruitCost +
        "</label>";
    let vegetableCart = document.getElementById("vegetable-cart");
    vegetableCart.innerHTML =
        "Total cost for vegetables: R" +
        '<label id="totalVegetableCost" style="display: initial;">' +
        totalVegetableCost +
        "</label>";
}

// Logic used for only the Catalogue Page

// This function loads the catalogue page dynamically
function loadFruitsAndVegetablesToPage(arrayOfProducts) {
    arrayOfProducts.forEach((product) => {
        let tr;
        // Depending on the type of object (Fruit/Vegetable) use either the fruit table row or the vegetable table row
        if (product.constructor.name === "Fruit") {
            tr = document.getElementById("fruit-row");
        } else {
            tr = document.getElementById("vegetable-row");
        }

        // Create a table data cell to store the image of the Fruit/Vegetable
        let td = document.createElement("td");
        td.setAttribute("class", "border rounded item");
        // For each of the products, we create an image element that will display the product's image.
        let productImg = document.createElement("img");
        productImg.src = product.imageSrc;
        productImg.alt = product.name;
        productImg.setAttribute("class", "img-thumbnail shadow");
        productImg.style.height = "120px";
        productImg.style.width = "200px";

        // Add a quick add to cart button
        let productQuickAdd = document.createElement("button");
        productQuickAdd.innerHTML = "Quick Add to Cart";
        productQuickAdd.setAttribute("class", "btn btn-primary");
        productQuickAdd.addEventListener("click", function (e) {
            addToCart(product);
        });

        // Add an event listener to display the <dialog> element on click
        productImg.addEventListener("click", function (e) {
            showDialog(product);
        });

        td.appendChild(productImg);
        td.appendChild(document.createElement("hr"));
        td.appendChild(productQuickAdd);

        tr.appendChild(td);
    });
}

function showDialog(product) {
    // Create the <dialog> to allow the user to add the product to the cart
    dialog = document.createElement("DIALOG");
    // Append the <dialog> element to the body of the page.
    document.body.appendChild(dialog);

    // Create the input and the respective label prompt the user for a tip

    let wrapper = document.createElement("div");
    wrapper.setAttribute("class", "border rounded item");
    // We create an image element that will display the product's image.
    let itemImg = document.createElement("img");
    itemImg.src = product.imageSrc;
    itemImg.alt = product.name;
    itemImg.setAttribute("class", "img-thumbnail shadow");
    itemImg.style.height = "120px";
    itemImg.style.width = "200px";

    // Display the price of the product
    let itemP = document.createElement("p");
    itemP.innerHTML = product.name + "<br/>" + "Price per Kg: R" + product.price;

    wrapper.appendChild(itemImg);
    wrapper.appendChild(itemP);

    // Add an add to cart button
    let addToCartButton = document.createElement("button");
    addToCartButton.innerHTML = "Add to Cart";
    addToCartButton.setAttribute("class", "btn btn-primary mr-2");
    addToCartButton.addEventListener("click", function (e) {
        addToCart(product);
        // Close the dialog and remove it from the document's body or it will persist
        e.target.parentElement.close();
        document.body.removeChild(dialog);
    });
    // Create the close button on the dialog.
    let closeButton = document.createElement("button");
    closeButton.innerHTML = "Close";
    closeButton.setAttribute("class", "btn btn-primary");
    closeButton.addEventListener("click", function (e) {
        // Close the dialog and remove it from the document's body or it will persist
        e.target.parentElement.close();
        document.body.removeChild(dialog);
    });
    dialog.appendChild(wrapper);
    dialog.appendChild(document.createElement("hr"));
    dialog.appendChild(addToCartButton);
    dialog.appendChild(closeButton);

    // Finally show the dialog
    window.dialog.showModal();
}

// This function adds a single product to the cart stores in the session storage
function addToCart(product) {
    cart = JSON.parse(sessionStorage.getItem("cart")); // Get the cart array of Fruit/Vegetable objects from sessionStorage and assign it to the array 'cart'
    cart.push(product); // Add the product to the array

    let cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length; // Display the amount of items in the cart on the nav bar
    // Re-set the cart array to the session storage
    sessionStorage.setItem("cart", JSON.stringify(cart));
    // Calculate and display the total of all the items
    let total = 0;
    cart.forEach((item) => {
        total += Number(item.price);
    });
    alert("The total of all your items is: R" + total);
}
