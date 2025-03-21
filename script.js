document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".product-img");
    let index = 0;
    if (!images.length) return;
    function showNextImage() {
        images.forEach((img, i) => {
            img.style.opacity = i === index ? "1" : "0";
        });
        index = (index + 1) % images.length;
    }
    images.forEach(img => img.style.opacity = "0");
    images[0].style.opacity = "1";
    setInterval(showNextImage, 3000);
});

// Section Navigation
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');
}

document.querySelectorAll('nav.menu a, .logo, .logo a, .mobile-nav a, a.btn[data-target], a.back-btn').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = link.getAttribute('data-target');
        if (target) {
            showSection(target);
            document.getElementById('menu-toggle').checked = false;
        }
    });
});

// Product Data
const products = [
    { id: 1, name: "Nova 5", description: "Ryzen 5 5600GT / Radeon Vega 7 / 16GB / 500GB", price: "6 999 kr", image: "https://imgs.search.brave.com/JD5YyWmInIMsMgtGtLeadRbliLrnm6t2TwwftaWfi60/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ4/NjMyMDkyOS9waG90/by9oaWdoLWVuZC1j/b21wdXRpbmctZ2Ft/aW5nLXBjLWNhc2Uu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTZ6RnhvY3ZPU0Rv/RVlkYW5Xd3pQZFZ2/RXB2eWJ4LWpNa3Q2/dmtwQTV0MFU9" },
    { id: 2, name: "Titan 7", description: "Ryzen 5 7600 / RTX 4060 8GB / 16GB / 1TB", price: "11 999 kr", image: "https://imgs.search.brave.com/o1xiBSH6AVZwybj7YwsvWW2heXPwFd1VRs7A6VvQMX0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3Lndv/cmtzdGF0aW9uc3Bl/Y2lhbGlzdC5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjIv/MDcvV29ya3N0YXRp/b24tRnJvbnQtTGVm/dC0yLmpwZz9maXQ9/MTAwMCw3NTImc3Ns/PTE" },
    { id: 3, name: "Hyperion X", description: "Ryzen 7 7800X3D / RTX 4070 Ti SUPER 16GB / 32GB / 2TB", price: "17 999 kr", image: "https://imgs.search.brave.com/fhTQwhUDfXwg4r5PVpbTdOh3eSVY_CuMxRUZCN2p_n0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzF4RzVBT2l1b0wu/anBn" },
    { id: 4, name: "Ares Ultra", description: "Ryzen 9 7950X3D / RTX 4090 24GB / 64GB / 4TB", price: "29 999 kr", image: "https://imgs.search.brave.com/55xL-kAqB_DoDbbE1BA_3Goa8iDTaCHmk-KGHkLBdPg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mdWxs/Y2xlYXJlZC5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjUv/MDIvYWxpZW53YXJl/LWF3MzIyNXFmLmpw/Zw" },
    { id: 5, name: "Custom Computers", description: "Your dream PC, built to your exact needs.", price: "fr 6 999 kr", image: "https://imgs.search.brave.com/OeFzFgeWX_Cwdhpm2JPASsVdf9iw7lmVJFLKgphJlog/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWNo/YW5pY2Fsa2V5Ym9h/cmRzLmNvbS9jZG4v/c2hvcC9hcnRpY2xl/cy9rZXlib2FyZDEu/cG5nP3Y9MTcwODUz/Mjc2NyZ3aWR0aD05/NDA" },
    { id: 6, name: "Computer Upgrades", description: "Breathe new life into your PC with the latest hardware.", price: "fr 1 499 kr", image: "https://imgs.search.brave.com/qzPSoiyNZQsqDEbGTVp_laODBa1jLV3842PxLKhCn1g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oZWNh/dGVnYW1pbmcuY29t/L2Nkbi9zaG9wL2Zp/bGVzL0czTVBST19H/YW1pbmdfTWljZV9D/YXRhbG9nLndlYnA_/dj0xNzEzMTQ1MzM5/JndpZHRoPTU2MDA" },
    { id: 7, name: "Computer Servicing", description: "Keep your system running like new.", price: "1 499 kr", image: "https://imgs.search.brave.com/yOqC3n6MK5XIuW4T4U_tFo6NJwNCEGqlUJef4bkG-Q0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwLmdhbWVyYW50/aW1hZ2VzLmNvbS93/b3JkcHJlc3Mvd3At/Y29udGVudC91cGxv/YWRzLzIwMjMvMDIv/bG9naXRlY2gtZzQz/Mi13aXJlZC1nYW1p/bmctaGVhZHNldC5q/cGc" },
    { id: 8, name: "Computer Advicing", description: "Get expert advice before making a big purchase.", price: "fr 699 kr", image: "https://imgs.search.brave.com/iceik-Po98_GpDi3Ffulx-LMABwQJCWaMtqCD05EK5g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzI4LzY5LzY3/LzM2MF9GXzEyODY5/Njc5NF9CY3RDZDdu/Z0tVcmN4aFFBWThE/cXRYaVpLNjY2RFpr/RS5qcGc" }
];

// Populate Product Grid
const productGrid = document.getElementById('product-grid');
products.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}" />
      <div class="info">
        <h2>${prod.name}</h2>
        <h3>${prod.description.substring(0, 60)}</h3>
        <h4>${prod.price.substring(0, 60)}</h4>
        <a href="#" class="btn" data-id="${prod.id}">View Details</a>
      </div>
    `;
    productGrid.appendChild(card);
});

// Show Product Details
const productDetailContainer = document.getElementById('product-detail');
productGrid.addEventListener('click', e => {
    e.preventDefault();
    const btn = e.target.closest('.btn[data-id]');
    if (btn) {
        const prodId = parseInt(btn.getAttribute('data-id'));
        const prod = products.find(p => p.id === prodId);
        if (prod) showProductDetail(prod);
    }
});

function showProductDetail(prod) {
    productDetailContainer.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}" />
      <div class="detail-info">
        <h3>${prod.name}</h3>
        <p>${prod.description}</p>
        <button class="btn" id="buy-now">Buy Now</button>
        <button class="btn" id="add-to-cart">Add To Cart</button>
      </div>
    `;
    document.getElementById('buy-now').addEventListener('click', () => {
        alert('Proceeding to checkout...');
    });
    document.getElementById('add-to-cart').addEventListener('click', () => {
        addToCart(prod);
    });
    showSection('product-details');
}

// Shopping Cart Logic
let cart = [];
function addToCart(prod) {
    cart.push(prod);
    updateCartCount();
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.style.transform = 'scale(1.3)';
    setTimeout(() => { cartBtn.style.transform = 'scale(1)'; }, 300);
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

document.getElementById('cart-btn').addEventListener('click', () => {
    renderCart();
    openModal('cart-modal');
});

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h4>${item.name}</h4>
        <button data-index="trash.jpg" class="remove-item"><i class="fa fa-trash"></i></button>
      `;
        cartItemsContainer.appendChild(div);
    });
}

document.getElementById('cart-items').addEventListener('click', e => {
    if (e.target.closest('.remove-item')) {
        const idx = e.target.closest('.remove-item').getAttribute('data-index');
        cart.splice(idx, 1);
        updateCartCount();
        renderCart();
    }
});

// Modal Functionality
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.modal .close');
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(btn.getAttribute('data-modal'));
    });
});

function openModal(id) {
    document.getElementById(id).classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

window.addEventListener('click', e => {
    modals.forEach(modal => { if (e.target === modal) modal.classList.remove('active'); });
});

// Account (Login/Register)
let loggedInUser = null;
const accountBtn = document.getElementById('account-btn');
accountBtn.addEventListener('click', () => {
    if (!loggedInUser) openModal('login-modal');
    else alert(`Logged in as ${loggedInUser}`);
});

document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    loggedInUser = email;
    alert(`Welcome back, ${email}!`);
    closeModal('login-modal');
});

document.getElementById('register-form').addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target.elements[1].value;
    loggedInUser = email;
    alert(`Account created for ${email}!`);
    closeModal('register-modal');
});

document.getElementById('show-register').addEventListener('click', e => {
    e.preventDefault();
    closeModal('login-modal');
    openModal('register-modal');
});

document.getElementById('show-login').addEventListener('click', e => {
    e.preventDefault();
    closeModal('register-modal');
    openModal('login-modal');
});

// Checkout Button (in Cart Modal) – now navigates to Checkout page
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    closeModal('cart-modal');
    showSection('checkout');
});

// Checkout Form Submission (Dedicated Checkout Page)
document.getElementById('checkout-form').addEventListener('submit', e => {
    e.preventDefault();
    // Process the form data here as needed.
    alert("Thank you for your purchase!");
    cart = [];
    updateCartCount();
    showSection('home');
});

// Contact Form
document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    alert("Thank you for reaching out to us!");
    e.target.reset();
});