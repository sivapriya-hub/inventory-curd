
const inventoryForm = document.getElementById('inventoryForm');
const productName = document.getElementById('productName');
const category = document.getElementById('category');
const price = document.getElementById('price');
const quantity = document.getElementById('quantity');
const inventoryTable = document.querySelector('#inventoryTable tbody');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const editIndex = document.getElementById('editIndex');
const searchBox = document.getElementById('searchBox');
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
function displayInventory(items = inventory) {
    inventoryTable.innerHTML = "";
    items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.productName}</td>
            <td>${item.category}</td>
            <td>₹${item.price}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price * item.quantity}</td>
            <td>
                <button class="action-btn" onclick="editItem(${index})">Edit</button>
                <button class="action-btn" onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
        inventoryTable.appendChild(row);
    });
}
function saveInventory() {
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

inventoryForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newItem = {
        productName: productName.value,
        category: category.value,
        price: parseFloat(price.value),
        quantity: parseInt(quantity.value)
    };

    inventory.push(newItem);
    saveInventory();
    displayInventory();
    inventoryForm.reset();
});

function editItem(index) {
    const item = inventory[index];
    productName.value = item.productName;
    category.value = item.category;
    price.value = item.price;
    quantity.value = item.quantity;
    editIndex.value = index;
    addBtn.classList.add('hidden');
    updateBtn.classList.remove('hidden');
}
updateBtn.addEventListener('click', () => {
    const index = editIndex.value;
    inventory[index] = {
        productName: productName.value,
        category: category.value,
        price: parseFloat(price.value),
        quantity: parseInt(quantity.value)
    };

    saveInventory();
    displayInventory();
    inventoryForm.reset();
    addBtn.classList.remove('hidden');
    updateBtn.classList.add('hidden');
});
function deleteItem(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        inventory.splice(index, 1);
        saveInventory();
        displayInventory();
    }
}
searchBox.addEventListener('input', function () {
    const query = searchBox.value.toLowerCase();
    const filtered = inventory.filter(item =>
        item.productName.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
    displayInventory(filtered);
});
displayInventory();
