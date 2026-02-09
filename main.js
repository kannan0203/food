// Menu data
const menuItems = [
    { id: 1, name: 'Double Beef Burger', price: 12, image: 'f8e8bf07-6f7d-4ceb-8f3e-06d506fe89ce-removebg-preview.png' },
    { id: 2, name: 'Chicken Pizza', price: 15, image: '25d03675-4b89-4479-b374-7dc8b973cf8d-removebg-preview.png' },
    { id: 3, name: 'Veggie Salad', price: 8, image: '6d510ced-2e0e-4cf7-8a23-8cdec14db996-removebg-preview.png' },
    { id: 4, name: 'Grilled Fish', price: 18, image: 'f8e8bf07-6f7d-4ceb-8f3e-06d506fe89ce-removebg-preview.png' }
];

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const cardlist = document.querySelector('.card-list');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        mobileMenu.classList.toggle('active');
    });

    const menuLinks = document.querySelectorAll('.mobile-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}

// Swiper initialization for reviews
const swiper = new Swiper('.mySwiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        nextEl: '#next',
        prevEl: '#prev',
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});

// Cart functionality
let cart = [];

// Set up cart after page loads
window.addEventListener('load', function() {
    console.log('Page loaded, setting up cart');
    setupCart();
});

function setupCart() {
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    console.log('Found', buttons.length, 'add to cart buttons');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.order-card');
            
            if (!card) return;
            
            // Find product name and price
            const h4s = card.querySelectorAll('h4');
            if (h4s.length < 2) return;
            
            const name = h4s[0].textContent.trim();
            const price = h4s[1].textContent.trim();
            
            console.log('Added:', name, price);
            cart.push({ name, price });
            updateCart();
        });
    });
}

function updateCart() {
    const cartCount = document.querySelector('.cart-value');
    const cartTotal = document.querySelector('.total-amount');
    const cartItems = document.querySelector('.cart-list');
    
    // Update count
    if (cartCount) cartCount.textContent = cart.length;
    
    // Calculate total
    let total = 0;
    cart.forEach(item => {
        const num = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        if (!isNaN(num)) total += num;
    });
    
    if (cartTotal) cartTotal.textContent = '$' + total.toFixed(2);
    
    // Display items
    if (cartItems) {
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="padding: 10px; text-align: center; color: #999;">No items in cart</p>';
        } else {
            cart.forEach((item, idx) => {
                const div = document.createElement('div');
                div.style.cssText = 'padding: 10px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;';
                div.innerHTML = `
                    <div>
                        <p style="margin: 0; font-weight: bold; font-size: 14px;">${item.name}</p>
                        <p style="margin: 0; font-size: 13px; color: #666;">${item.price}</p>
                    </div>
                    <button onclick="deleteItem(${idx})" style="padding: 5px 10px; background: #ff6b35; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px;">Remove</button>
                `;
                cartItems.appendChild(div);
            });
        }
    }
}

window.deleteItem = function(idx) {
    cart.splice(idx, 1);
    updateCart();
}

let productlist = [];

const showcards = () => {
    productlist.forEach(product => {
        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card');

        orderCard.innerHTML = `
             <div class="card-image">
                            <img src="f8e8bf07-6f7d-4ceb-8f3e-06d506fe89ce-removebg-preview.png" alt="">
                        </div>
                        <h4>Double beef burger</h4>
                        <h4 class="price">$200</h4> <br>
                        <a href="#" class="btn">Add to cart</a>
                    </div>
        `;

        cardlist.appendChild(orderCard);

    });
}

const initApp = () => {

    fetch('products.json').then
        (response => response.json()).then
        (data => {
            productlist = data;
            showcards();
        });
}



