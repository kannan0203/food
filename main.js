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
const cartValue = document.querySelector('.cart-value');

function updateCartCount() {
    cartValue.textContent = cart.length;
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-btn')) {
        const card = e.target.closest('.order-card');
        if (card) {
            const itemName = card.querySelector('h4').textContent;
            const itemPrice = card.querySelector('.price').textContent;

            cart.push({ name: itemName, price: itemPrice });
            updateCartCount();
        }
    }
});

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



