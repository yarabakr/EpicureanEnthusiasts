     var loader= document.getElementById("preloader")

  window.addEventListener("load", function(){
   loader.style.display="none"
  } )
  
  
var cartVisible = false;

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var deleteButtons = document.getElementsByClassName('btn-delete');
    for (var i = 0; i < deleteButtons.length; i++) {
        var button = deleteButtons[i];
        button.addEventListener('click', eliminateItemCart);
    }

    var addQuantityButtons = document.getElementsByClassName('add-quantity');
    for (var i = 0; i < addQuantityButtons.length; i++) {
        var button = addQuantityButtons[i];
        button.addEventListener('click', addQuantity);
    }

    var subtractQuantityButtons = document.getElementsByClassName('subtract-quantity');
    for (var i = 0; i < subtractQuantityButtons.length; i++) {
        var button = subtractQuantityButtons[i];
        button.addEventListener('click', subtractQuantity);
    }

    var addToCartButtons = document.getElementsByClassName('btn-add-to-cart');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('btn-pay')[0].addEventListener('click', payClicked);
}

function payClicked() {
    alert("Thanks for your purchase");
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateTotalCart();
    hideCart();
}

function addToCartClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var title = item.getElementsByClassName('title-item')[0].innerText;
    var price = item.getElementsByClassName('price-item')[0].innerText;
    var imageSrc = item.getElementsByClassName('img-item')[0].src;

    addItemToCart(title, price, imageSrc);
    showCart();
}

function showCart() {
    cartVisible = true;
    var cart = document.getElementsByClassName('cart')[0];
    cart.style.marginRight = '0';
    cart.style.opacity = '1';

    var items = document.getElementsByClassName('container-items')[0];
    items.style.width = '60%';
}

function addItemToCart(title, price, imageSrc) {
    var item = document.createElement('div');
    item.classList.add('item');
    var cartItems = document.getElementsByClassName('cart-items')[0];

    var itemTitles = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < itemTitles.length; i++) {
        if (itemTitles[i].innerText == title) {
            alert("The item is already in the cart");
            return;
        }
    }

    var cartItemContent = `
        <div class="cart-item">
            <img src="${imageSrc}" width="80px" alt="">
            <div class="cart-item-details">
                <span class="cart-item-title">${title}</span>
                <div class="quantity-selector">
                    <i class="fa-solid fa-minus subtract-quantity"></i>
                    <input type="text" value="1" class="cart-item-quantity" disabled>
                    <i class="fa-solid fa-plus add-quantity"></i>
                </div>
                <span class="cart-item-price">${price}</span>
            </div>
            <button class="btn-delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    item.innerHTML = cartItemContent;
    cartItems.append(item);

    item.getElementsByClassName('btn-delete')[0].addEventListener('click', eliminateItemCart);
    var subtractButton = item.getElementsByClassName('subtract-quantity')[0];
    subtractButton.addEventListener('click', subtractQuantity);
    var addButton = item.getElementsByClassName('add-quantity')[0];
    addButton.addEventListener('click', addQuantity);
    updateTotalCart();
}

function addQuantity(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var currentQuantity = selector.getElementsByClassName('cart-item-quantity')[0].value;
    currentQuantity++;
    selector.getElementsByClassName('cart-item-quantity')[0].value = currentQuantity;
    updateTotalCart();
}

function subtractQuantity(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var currentQuantity = selector.getElementsByClassName('cart-item-quantity')[0].value;
    currentQuantity--;
    if (currentQuantity >= 1) {
        selector.getElementsByClassName('cart-item-quantity')[0].value = currentQuantity;
        updateTotalCart();
    }
}

function eliminateItemCart(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotalCart();
    hideCart();
}

function hideCart() {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    if (cartItems.childElementCount == 0) {
        var cart = document.getElementsByClassName('cart')[0];
        cart.style.marginRight = '-100%';
        cart.style.opacity = '0';
        cartVisible = false;

        var items = document.getElementsByClassName('container-items')[0];
        items.style.width = '100%';
    }
}

function updateTotalCart() {
    var cartContainer = document.getElementsByClassName('cart')[0];
    var cartItems = cartContainer.getElementsByClassName('cart-item');
    var total = 0;

    for (var i = 0; i < cartItems.length; i++) {
        var item = cartItems[i];
        var priceElement = item.getElementsByClassName('cart-item-price')[0];
        var price = parseFloat(priceElement.innerText.replace('$', '').replace('.', ''));
        var quantityItem = item.getElementsByClassName('cart-item-quantity')[0];
        var quantity = quantityItem.value;
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total.toLocaleString("es") + ",00";
}


const mobile = document.querySelector('.menu-toggle');
const mobilelink = document.querySelector('.navbar');

mobile.addEventListener('click', function(){
  mobile.classList.toggle("is-active");
  mobilelink.classList.toggle("active")
})

mobilelink.addEventListener('click', function(){
  const menuBars = document.querySelector(".is-active");
  if(window.innerWidth<=768 && menuBars){
    mobile.classList.toggle("is-active");
    mobilelink.classList.toggle("active");
  }
})

var step =100;
var stepFilter=60;
var scrolling= true;

$(".back").bind("click", function(e){
  e.preventDefault();
  $(".highlight-wrapper").animate({
    scrollLeft: "-=" +step+ "px"
  });
});

$(".next").bind("click", function(e){
  e.preventDefault();
  $(".highlight-wrapper").animate({
    scrollLeft: "+=" +step+ "px"
  })
})



$(".back-menus").bind("click", function(e){
  e.preventDefault();
  $("filter-wrapper").animate({
    scrollLeft: "-=" +stepFilter+ "px"
  })
});

$(".next-menus").bind("click", function(e){
  e.preventDefault();
  $(".filter-wrapper").animate({
    scrollLeft: "+=" +stepFilter+ "px"
  });
});


function bigBtn(x) {
    x.style.height = "60px";
    x.style.width = "200px";
}

function normalBtn(x) {
   x.style.height = "50px";
   x.style.width = "150px";
}



