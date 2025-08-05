// Menu items array with image names
        const menuItems = [
            { name: "Classic Beef Burger", price: 850.00, category: "burgers", image: "../IMG/ITEM_IMG/DC_202012_0116_SpicyCrispyChicken_PotatoBun_1564x1564-1_nutrition-calculator-tile.jpeg" },
            { name: "Spicy Chicken Burger", price: 750.00, category: "burgers", image: "../IMG/ITEM_IMG/DC_202012_0383_CrispyChickenSandwich_PotatoBun_1564x1564-1_nutrition-calculator-tile.jpeg" },
            { name: "Big Burger", price: 650.00, category: "burgers", image: "../IMG/ITEM_IMG/DC_202104_0100_DeluxeSpicyCrispyChickenSandwich_PotatoBun_1564x1564-1_nutrition-calculator-tile.jpeg" },
            { name: "Cheese Burger", price: 700.00, category: "burgers", image: "../IMG/ITEM_IMG/DC_202302_0001-999_Hamburger_Alt_1564x1564-1_nutrition-calculator-tile.jpeg" },
            { name: "Veggie Burger", price: 600.00, category: "burgers", image: "../IMG/ITEM_IMG/DC_202302_0592-999_McDouble_Alt_1564x1564-1_nutrition-calculator-tile.jpeg" },
            { name: "French Fries", price: 300.00, category: "sides", image: "../IMG/ITEM_IMG/DC_202002_6050_SmallFrenchFries_Standing_1564x1564-1_nutrition-calculator-tile.jpeg" },
            { name: "Coca Cola", price: 200.00, category: "drinks", image: "../IMG/ITEM_IMG/DC_202112_0652_MediumDietCoke_Glass_1564x1564-1_nutrition-calculator-tile.jpeg" },
            { name: "Orange Drink", price: 450.00, category: "drinks", image: "../IMG/ITEM_IMG/DC_202012_0621_MediumHi-COrange_1564x1564-1_nutrition-calculator-tile.jpeg" },
            { name: "Orange Juice", price: 250.00, category: "drinks", image: "../IMG/ITEM_IMG/DC_202212_1262_MediumFantaOrange_Glass_1564x1564-1_nutrition-calculator-tile.jpeg" },,
            { name: "Spicy Chicken Burger", price: 750.00, category: "burgers", image: "../IMG/ITEM_IMG/DC_202309_4282_QuarterPounderCheeseDeluxe_Shredded_1564x1564-1_nutrition-calculator-tile.jpeg" },
            { name: "Big Mac Burger", price: 650.00, category: "burgers", image: "../IMG/ITEM_IMG/DC_202302_0005-999_BigMac_1564x1564-1_nutrition-calculator-tile.jpeg" },
            { name: "Ice Cream", price: 300.00, category: "desserts", image: "../IMG/ITEM_IMG/VanilaIceCream.jpeg" }
        ];

        const customers = [
            { phone: "0771234567", name: "John Doe", email: "john@example.com" },
            { phone: "0777654321", name: "Jane Smith", email: "jane@example.com" }
        ];

        let selectedItems = [];
        let currentCategory = 'all';

        // Update date and time
        function updateDateTime() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
            
            // Update order date
            const dateOptions = { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            };
            document.getElementById('orderDate').textContent = now.toLocaleDateString('en-US', dateOptions);
        }

        // Display menu items
        function displayMenuItems(items) {
            const menuContainer = document.getElementById('menuItems');
            menuContainer.innerHTML = '';

            items.forEach(item => {
                const menuItemDiv = document.createElement('div');
                menuItemDiv.className = 'col-md-4 mb-3';
                menuItemDiv.innerHTML = `
                    <div class="card menu-item h-100" onclick="addToOrder('${item.name}', ${item.price})">
                        <div class="card-body text-center">
                            <img src="images/${item.image}" alt="${item.name}" class="mb-2">
                            <h6 class="card-title">${item.name}</h6>
                            <p class="card-text fw-bold text-primary">LKR ${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                `;
                menuContainer.appendChild(menuItemDiv);
            });
        }

        // Filter menu items by category
        function filterByCategory(category) {
            currentCategory = category;
            const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
            displayMenuItems(filteredItems);

            // Update active button
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-category="${category}"]`).classList.add('active');
        }

        // Add item to order
        function addToOrder(name, price) {
            selectedItems.push({ name, price });
            updateOrderDisplay();
        }

        // Update order display
        function updateOrderDisplay() {
            const selectedItemsContainer = document.getElementById('selectedItems');
            const totalAmount = document.getElementById('totalAmount');

            selectedItemsContainer.innerHTML = '';
            let total = 0;

            selectedItems.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'd-flex justify-content-between align-items-center mb-2';
                itemDiv.innerHTML = `
                    <span>${item.name}</span>
                    <div>
                        <span class="me-2">LKR ${item.price.toFixed(2)}</span>
                        <button class="btn btn-sm btn-danger" onclick="removeFromOrder(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                selectedItemsContainer.appendChild(itemDiv);
                total += item.price;
            });

            totalAmount.textContent = `LKR ${total.toFixed(2)}`;
        }

        // Remove item from order
        function removeFromOrder(index) {
            selectedItems.splice(index, 1);
            updateOrderDisplay();
        }

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredItems = menuItems.filter(item => 
                item.name.toLowerCase().includes(searchTerm) &&
                (currentCategory === 'all' || item.category === currentCategory)
            );
            displayMenuItems(filteredItems);
        });

        // Category button event listeners
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                filterByCategory(this.dataset.category);
            });
        });

        // Checkout function
        function processCheckout() {
            if (selectedItems.length === 0) {
                alert('Please add items to your order first');
                return;
            }
            
            const phone = document.querySelector('input[placeholder="Enter Phone Number"]').value;
            const name = document.querySelector('input[placeholder="Customer Name"]').value;
            
            if (!phone || !name) {
                alert('Please enter customer phone number and name');
                return;
            }

            alert('Order processed successfully!');
            selectedItems = [];
            updateOrderDisplay();
            document.querySelectorAll('.customer-input').forEach(input => input.value = '');
        }

        function showCustomerForm() {
            // Remove any existing modal first
            const existingModal = document.querySelector('.customer-modal');
            if (existingModal) existingModal.remove();
            
            const modal = document.createElement('div');
            modal.className = 'customer-modal';
            modal.innerHTML = `
                <div class="customer-modal-content">
                    <h5 class="mb-4">Add New Customer</h5>
                    <div class="mb-3">
                        <label class="form-label">Phone Number</label>
                        <input type="tel" class="form-control" id="newCustomerPhone" pattern="[0-9]{10}" placeholder="Enter 10-digit phone number">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Customer Name</label>
                        <input type="text" class="form-control" id="newCustomerName" placeholder="Enter customer name">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Customer Email</label>
                        <input type="email" class="form-control" id="newCustomerEmail" placeholder="Enter customer email">
                    </div>
                    <div class="d-flex justify-content-end gap-2">
                        <button class="btn btn-secondary" onclick="closeCustomerModal()">Cancel</button>
                        <button class="btn btn-primary" onclick="saveCustomer()">Save</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            attachCustomerAutoFill();
        }

        function closeCustomerModal() {
            document.querySelector('.customer-modal').remove();
        }

        function saveCustomer() {
            const phone = document.getElementById('newCustomerPhone').value;
            const name = document.getElementById('newCustomerName').value;
            const email = document.getElementById('newCustomerEmail').value;

            if (!phone || !name || !email) {
                alert('Please fill in all fields');
                return;
            }

            // Validate phone number format
            if (!/^[0-9]{10}$/.test(phone)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }

            // Validate email format
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Check if customer already exists
            const existingCustomer = customers.findIndex(c => c.phone === phone);
            if (existingCustomer !== -1) {
                customers[existingCustomer] = { phone, name, email };
                alert('Customer information updated successfully!');
            } else {
                customers.push({ phone, name, email });
                alert('New customer added successfully!');
            }            // Update the main form if this customer is currently selected
            const mainPhoneInput = document.querySelector('input[placeholder="Enter Phone Number"]');
            if (mainPhoneInput && mainPhoneInput.value === phone) {
                document.querySelector('input[placeholder="Customer Name"]').value = name;
                document.querySelector('input[placeholder="Customer Email"]').value = email;
            }

            closeCustomerModal();
        }

        // Add customer info icon to the form
        window.addEventListener('DOMContentLoaded', function() {
            const phoneInput = document.querySelector('input[placeholder="Enter Phone Number"]');
            const icon = document.createElement('i');
            icon.className = 'fas fa-user-plus customer-info-icon';
            icon.title = 'Add/Edit Customer Details';
            icon.onclick = showCustomerForm;
            phoneInput.parentElement.style.position = 'relative';
            phoneInput.insertAdjacentElement('afterend', icon);

            // Move the icon next to the input
            icon.style.position = 'absolute';
            icon.style.right = '10px';
            icon.style.top = '50%';
            icon.style.transform = 'translateY(-50%)';
        });

        // Enhanced auto-fill for all phone number inputs
        function attachCustomerAutoFill() {
            document.querySelectorAll('input[placeholder="Enter Phone Number"]').forEach(function(input) {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        const phone = this.value;
                        const customer = customers.find(c => c.phone === phone);
                        if (customer) {
                            // Find the closest parent form or container
                            const container = this.closest('form') || this.parentElement;
                            // Try to find the name and email fields within the same container
                            const nameInput = container.querySelector('input[placeholder="Customer Name"]') || document.querySelector('input[placeholder="Customer Name"]');
                            const emailInput = container.querySelector('input[placeholder="Customer Email"]') || document.querySelector('input[placeholder="Customer Email"]');
                            if (nameInput) nameInput.value = customer.name;
                            if (emailInput) emailInput.value = customer.email;
                        }
                    }
                });
            });
        }

        // Attach on DOMContentLoaded and after modal is shown
        window.addEventListener('DOMContentLoaded', function() {
            // ...existing code...
            attachCustomerAutoFill();
        });

        // Also call after showing customer form (in case of dynamic fields)
        function showCustomerForm() {
            // Remove any existing modal first
            const existingModal = document.querySelector('.customer-modal');
            if (existingModal) existingModal.remove();
            
            const modal = document.createElement('div');
            modal.className = 'customer-modal';
            modal.innerHTML = `
                <div class="customer-modal-content">
                    <h5 class="mb-4">Add New Customer</h5>
                    <div class="mb-3">
                        <label class="form-label">Phone Number</label>
                        <input type="tel" class="form-control" id="newCustomerPhone" pattern="[0-9]{10}" placeholder="Enter 10-digit phone number">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Customer Name</label>
                        <input type="text" class="form-control" id="newCustomerName" placeholder="Enter customer name">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Customer Email</label>
                        <input type="email" class="form-control" id="newCustomerEmail" placeholder="Enter customer email">
                    </div>
                    <div class="d-flex justify-content-end gap-2">
                        <button class="btn btn-secondary" onclick="closeCustomerModal()">Cancel</button>
                        <button class="btn btn-primary" onclick="saveCustomer()">Save</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            attachCustomerAutoFill();
        }

        // Initialize
        updateDateTime();
        setInterval(updateDateTime, 1000);
        displayMenuItems(menuItems);