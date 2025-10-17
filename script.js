/* ===== GLOBAL VARIABLES ===== */
let cart = [];
let customerInfo = {};
let orders = JSON.parse(localStorage.getItem('plantOrders')) || [];
let wishlist = [];

/* ===== PRODUCT DATA ===== */
const products = {
    1: {
        id: 1,
        name: "Money Plant",
        price: 180,
        image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200",
        description: "Popular indoor plant for good luck and air purification. Easy to maintain and grows well in indirect sunlight.",
        category: "indoor",
        care: "Water once a week, indirect sunlight"
    },
    2: {
        id: 2,
        name: "Tulsi Plant",
        price: 150,
        image: "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200",
        description: "Holy basil with medicinal properties and religious significance. Known for its air purifying qualities.",
        category: "medicinal",
        care: "Daily watering, direct sunlight"
    },
    3: {
        id: 3,
        name: "Rose Plant",
        price: 200,
        image: "https://images.pexels.com/photos/235721/pexels-photo-235721.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200",
        description: "Beautiful red roses that add color and fragrance to your garden. Perfect for gifting and decoration.",
        category: "flowering",
        care: "Water every 2 days, direct sunlight"
    },
    4: {
        id: 4,
        name: "Aloe Vera",
        price: 220,
        image: "https://images.pexels.com/photos/4503269/pexels-photo-4503269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200",
        description: "Medicinal plant with healing properties for skin and health. Requires minimal maintenance.",
        category: "medicinal",
        care: "Water once every 2 weeks, indirect sunlight"
    },
    5: {
        id: 5,
        name: "Bamboo Plant",
        price: 250,
        image: "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200",
        description: "Fast-growing plant perfect for creating natural fences and adding greenery to outdoor spaces.",
        category: "outdoor",
        care: "Regular watering, direct sunlight"
    },
    6: {
        id: 6,
        name: "Snake Plant",
        price: 280,
        image: "https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200",
        description: "Low maintenance indoor plant that purifies the air. Thrives in low light conditions.",
        category: "indoor",
        care: "Water once a month, low light"
    }
};

/* ===== SIDEBAR FUNCTIONS ===== */
function openSidebar() {
    document.getElementById("mySidebar").style.width = "250px";
    document.body.style.marginLeft = "250px";
}

function closeSidebar() {
    document.getElementById("mySidebar").style.width = "0";
    document.body.style.marginLeft = "0";
}

/* ===== LOGIN MODAL FUNCTIONS ===== */
function openLoginModal() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
}

window.onclick = function(event) {
    var modal = document.getElementById("loginModal");
    if(event.target == modal){
        closeLoginModal();
    }
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
}

/* ===== LOGIN FUNCTIONS ===== */
function handleLogin() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if(!username || !password){
        alert("Please enter username and password");
        return;
    }

    document.getElementById("loginButton").style.display = "none";
    document.getElementById("userProfile").style.display = "block";
    
    if(username === "admin") {
        document.getElementById("adminButton").style.display = "block";
    }
    
    alert(`Login successful for ${username}`);
    closeLoginModal();
}

function handleSignup() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm").value;

    if(!name || !email || !password || !confirmPassword){
        alert("Please fill all fields");
        return;
    }
    
    if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
    }

    alert(`Account created successfully for ${name}`);
    switchTab('login');
}

function forgotPassword(){
    const email = prompt("Please enter your email address:");
    if(email) {
        alert(`Password reset link sent to ${email}`);
    }
}

function logout() {
    document.getElementById("loginButton").style.display = "block";
    document.getElementById("userProfile").style.display = "none";
    document.getElementById("adminButton").style.display = "none";
    alert("You have been logged out");
}

/* ===== CART FUNCTIONALITY ===== */
function openCartModal() {
    document.getElementById("cartModal").style.display = "block";
    updateCartDisplay();
}

function closeCartModal() {
    document.getElementById("cartModal").style.display = "none";
}

function addToCart(productId, productName, productPrice, productImage) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseInt(productPrice),
            image: productImage,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartDisplay();
    alert(`${productName} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = '₹0';
        return;
    }
    
    let total = 0;
    let itemsHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemsHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <span class="remove-item" onclick="removeFromCart(${item.id})">Remove</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = itemsHTML;
    cartTotal.textContent = `₹${total}`;
}

/* ===== CHECKOUT PROCESS ===== */
function showCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    document.getElementById("checkoutModal").style.display = "flex";
    loadCheckoutStep(1);
}

function loadCheckoutStep(step) {
    let content = '';
    
    switch(step) {
        case 1:
            content = `
                <h3>Delivery Address</h3>
                <form id="addressForm">
                    <input type="text" placeholder="Full Name" id="customerName" required>
                    <input type="text" placeholder="Address" id="customerAddress" required>
                    <input type="text" placeholder="City" id="customerCity" required>
                    <input type="text" placeholder="Pincode" id="customerPincode" required>
                    <input type="tel" placeholder="Phone Number" id="customerPhone" required>
                    <input type="email" placeholder="Email" id="customerEmail" required>
                    <button type="button" class="checkout-btn" onclick="saveAddressAndProceed()">Continue to Payment</button>
                </form>
            `;
            break;
        case 2:
            content = `
                <h3>Payment Method</h3>
                <div class="payment-options">
                    <label><input type="radio" name="payment" value="card" checked> Credit/Debit Card</label>
                    <label><input type="radio" name="payment" value="upi"> UPI</label>
                    <label><input type="radio" name="payment" value="cod"> Cash on Delivery</label>
                    <label><input type="radio" name="payment" value="wallet"> Wallet</label>
                </div>
                <button class="checkout-btn" onclick="processPayment()">Complete Order</button>
            `;
            break;
    }
    
    document.getElementById('checkoutContent').innerHTML = content;
    updateCheckoutSteps(step);
}

function saveAddressAndProceed() {
    customerInfo = {
        name: document.getElementById('customerName').value,
        address: document.getElementById('customerAddress').value,
        city: document.getElementById('customerCity').value,
        pincode: document.getElementById('customerPincode').value,
        phone: document.getElementById('customerPhone').value,
        email: document.getElementById('customerEmail').value
    };
    
    if (!customerInfo.name || !customerInfo.address || !customerInfo.city || 
        !customerInfo.pincode || !customerInfo.phone || !customerInfo.email) {
        alert('Please fill all fields');
        return;
    }
    
    loadCheckoutStep(2);
}

function updateCheckoutSteps(currentStep) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else if (index + 1 < currentStep) {
            step.classList.add('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

/* ===== PAYMENT PROCESS WITH WHATSAPP NOTIFICATIONS ===== */
function processPayment() {
    const orderId = 'GPS' + Date.now();
    const order = {
        id: orderId,
        customer: customerInfo,
        items: [...cart],
        total: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
        status: 'confirmed',
        date: new Date().toLocaleString('en-IN')
    };
    
    saveOrder(order);
    sendWhatsAppNotification(order);
    showOrderConfirmation(order);
    
    cart = [];
    updateCartCount();
    updateCartDisplay();
    closeCheckoutModal();
    
    return false;
}

function closeCheckoutModal() {
    document.getElementById("checkoutModal").style.display = "none";
}

/* ===== PRODUCT DETAILS ===== */
function showProductDetail(productId) {
    const product = products[productId];
    const modalContent = `
        <div class="product-detail">
            <div class="product-images">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h2>${product.name}</h2>
                <p class="price">₹${product.price}</p>
                <p class="description">${product.description}</p>
                <p><strong>Care Instructions:</strong> ${product.care}</p>
                <div class="quantity-selector">
                    <label>Quantity:</label>
                    <input type="number" id="productQuantity" value="1" min="1" max="10">
                </div>
                <button class="add-to-cart" onclick="addToCartFromDetail(${productId})">Add to Cart</button>
            </div>
        </div>
    `;
    document.getElementById('productDetailContent').innerHTML = modalContent;
    document.getElementById('productDetailModal').style.display = 'flex';
}

function closeProductDetail() {
    document.getElementById('productDetailModal').style.display = 'none';
}

function addToCartFromDetail(productId) {
    const product = products[productId];
    const quantity = parseInt(document.getElementById('productQuantity').value) || 1;
    
    for(let i = 0; i < quantity; i++) {
        addToCart(product.id, product.name, product.price, product.image);
    }
    
    closeProductDetail();
}

/* ===== WISHLIST ===== */
function toggleWishlist(button) {
    const productId = button.getAttribute('data-id');
    const product = products[productId];
    
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        button.innerHTML = '<i class="far fa-heart"></i>';
        button.classList.remove('active');
    } else {
        wishlist.push(product);
        button.innerHTML = '<i class="fas fa-heart"></i>';
        button.classList.add('active');
    }
}

function showWishlist() {
    if (wishlist.length === 0) {
        document.getElementById('wishlistItems').innerHTML = '<div class="empty-cart">Your wishlist is empty</div>';
    } else {
        let wishlistHTML = '';
        wishlist.forEach(item => {
            wishlistHTML += `
                <div class="wishlist-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="wishlist-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">₹${item.price}</div>
                        <div class="wishlist-actions">
                            <button class="add-to-cart" onclick="addToCart(${item.id}, '${item.name}', ${item.price}, '${item.image}')">Add to Cart</button>
                            <button class="remove-item" onclick="removeFromWishlist(${item.id})">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        });
        document.getElementById('wishlistItems').innerHTML = wishlistHTML;
    }
    document.getElementById('wishlistModal').style.display = 'flex';
}

function closeWishlist() {
    document.getElementById('wishlistModal').style.display = 'none';
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    const wishlistBtn = document.querySelector(`.wishlist-btn[data-id="${productId}"]`);
    if (wishlistBtn) {
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
        wishlistBtn.classList.remove('active');
    }
    showWishlist();
}

/* ===== ORDER TRACKING ===== */
function showOrderTracking() {
    const trackingHTML = `
        <div class="order-tracking">
            <h3>Order #ORD12345</h3>
            <p><strong>Status:</strong> Shipped</p>
            <p><strong>Estimated Delivery:</strong> 2-3 business days</p>
            <div class="tracking-steps">
                <div class="tracking-step active">
                    <div class="step-icon"><i class="fas fa-check"></i></div>
                    <div>Order Placed</div>
                </div>
                <div class="tracking-step active">
                    <div class="step-icon"><i class="fas fa-check"></i></div>
                    <div>Processing</div>
                </div>
                <div class="tracking-step active">
                    <div class="step-icon"><i class="fas fa-shipping-fast"></i></div>
                    <div>Shipped</div>
                </div>
                <div class="tracking-step">
                    <div class="step-icon"><i class="fas fa-home"></i></div>
                    <div>Delivered</div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('orderTrackingContent').innerHTML = trackingHTML;
    document.getElementById('orderTrackingModal').style.display = 'flex';
}

function closeOrderTracking() {
    document.getElementById('orderTrackingModal').style.display = 'none';
}

/* ===== WHATSAPP NOTIFICATION SYSTEM ===== */
function sendWhatsAppNotification(order) {
    const phoneNumber = "916395856668";
    
    const message = `🌿 *NEW ORDER CONFIRMED* 🌿

*Order ID:* ${order.id}
*Date:* ${order.date}

*Customer Details:*
👤 Name: ${order.customer.name}
📞 Phone: ${order.customer.phone}
📧 Email: ${order.customer.email}
🏠 Address: ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}

*Order Items:*
${order.items.map(item => `• ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`).join('\n')}

*Total Amount:* ₹${order.total}
*Status:* ${order.status}

🌱 Green Plant Saharanpur
📞 6556515556`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    console.log('WhatsApp notification sent to admin');
}

function showOrderConfirmation(order) {
    const confirmationHTML = `
        <div id="orderConfirmation" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); display:flex; justify-content:center; align-items:center; z-index:2000;">
            <div style="background:white; padding:40px; border-radius:20px; text-align:center; max-width:600px; width:90%; box-shadow:0 20px 50px rgba(0,0,0,0.3);">
                <div style="font-size:80px; color:#4CAF50; margin-bottom:20px;">🎉</div>
                <h2 style="color:#2E7D32; margin-bottom:15px; font-size:28px;">Order Confirmed Successfully!</h2>
                <p style="font-size:18px; color:#666; margin-bottom:30px;">Thank you for your order</p>
                
                <div style="background:linear-gradient(135deg, #f8fffe, #e0f2f1); padding:25px; border-radius:15px; margin:25px 0; text-align:left; border:2px solid #4CAF50;">
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                        <div>
                            <strong>📦 Order ID:</strong><br>${order.id}
                        </div>
                        <div>
                            <strong>👤 Customer:</strong><br>${order.customer.name}
                        </div>
                        <div>
                            <strong>📞 Phone:</strong><br>${order.customer.phone}
                        </div>
                        <div>
                            <strong>💰 Total Amount:</strong><br>₹${order.total}
                        </div>
                    </div>
                    <div style="margin-top:15px;">
                        <strong>🏠 Delivery Address:</strong><br>
                        ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}
                    </div>
                </div>
                
                <div style="background:#e8f5e9; padding:15px; border-radius:10px; margin:20px 0;">
                    <p style="color:#2E7D32; margin:0;">
                        ✅ <strong>Your plants will be delivered within 2-3 days</strong><br>
                        📞 We will contact you before delivery
                    </p>
                </div>
                
                <button onclick="closeOrderConfirmation()" style="background:linear-gradient(135deg, #4CAF50, #45a049); color:white; border:none; padding:15px 40px; border-radius:25px; font-size:16px; cursor:pointer; margin-top:10px; font-weight:bold;">
                    🛍️ Continue Shopping
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', confirmationHTML);
}

function closeOrderConfirmation() {
    const confirmation = document.getElementById('orderConfirmation');
    if (confirmation) {
        confirmation.remove();
    }
}

/* ===== ORDER MANAGEMENT ===== */
function saveOrder(order) {
    orders.push(order);
    localStorage.setItem('plantOrders', JSON.stringify(orders));
}

function showAdminPanel() {
    document.getElementById('adminPanel').style.display = 'flex';
    loadAdminOrders();
}

function closeAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
}

function loadAdminOrders() {
    const ordersList = document.getElementById('adminOrdersList');
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<div class="empty-cart">No orders yet</div>';
        return;
    }
    
    let ordersHTML = '';
    
    orders.forEach((order, index) => {
        let itemsHTML = '';
        order.items.forEach(item => {
            itemsHTML += `
                <div class="order-item">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>₹${item.price * item.quantity}</span>
                </div>
            `;
        });
        
        ordersHTML += `
            <div class="admin-order">
                <div class="admin-order-header">
                    <div>
                        <strong>Order #${order.id}</strong>
                        <div>${order.customer.name} - ${order.customer.phone}</div>
                        <div>${order.date}</div>
                    </div>
                    <div class="order-status status-${order.status}">${order.status.toUpperCase()}</div>
                </div>
                <div class="order-items">
                    ${itemsHTML}
                </div>
                <div style="text-align: right; font-weight: bold; margin-top: 10px;">
                    Total: ₹${order.total}
                </div>
                <div class="customer-details">
                    <p><strong>Delivery Address:</strong> ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}</p>
                    <p><strong>Contact:</strong> ${order.customer.phone} | ${order.customer.email}</p>
                </div>
                <div class="admin-actions">
                    ${order.status === 'pending' ? 
                        `<button class="admin-btn btn-confirm" onclick="updateOrderStatus(${index}, 'confirmed')">Confirm Order</button>` : ''}
                    ${order.status === 'confirmed' ? 
                        `<button class="admin-btn btn-ship" onclick="updateOrderStatus(${index}, 'shipped')">Mark as Shipped</button>` : ''}
                    ${order.status === 'shipped' ? 
                        `<button class="admin-btn btn-deliver" onclick="updateOrderStatus(${index}, 'delivered')">Mark as Delivered</button>` : ''}
                </div>
            </div>
        `;
    });
    
    ordersList.innerHTML = ordersHTML;
}

function updateOrderStatus(orderIndex, newStatus) {
    orders[orderIndex].status = newStatus;
    localStorage.setItem('plantOrders', JSON.stringify(orders));
    loadAdminOrders();
    alert(`Order status updated to ${newStatus}`);
}

/* ===== UTILITY FUNCTIONS ===== */
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function filterCategory(category) {
    const plants = document.querySelectorAll('.plant');
    plants.forEach(plant => {
        if (category === 'all' || plant.getAttribute('data-category') === category) {
            plant.style.display = 'block';
        } else {
            plant.style.display = 'none';
        }
    });
}

function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email').value;
    if(email) {
        alert(`Thank you for subscribing with ${email}!`);
        document.getElementById('newsletter-email').value = '';
    } else {
        alert('Please enter your email address');
    }
}

/* ===== INITIALIZATION ===== */
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            const image = this.getAttribute('data-image');
            addToCart(id, name, price, image);
        });
    });
    
    orders = JSON.parse(localStorage.getItem('plantOrders')) || [];
});