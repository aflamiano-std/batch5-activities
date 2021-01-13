let store = {
    name: 'TERMITE BREEDERS',
    inventory: [],
    earnings: 0
};

AddBook('BookBook1', 1, 1000);
AddBook('BookBook2', 2, 2000);
AddBook('BookBook3', 3, 3000);
AddBook('BookBook0', 0, 10000);
AddBook('BookBook4', 4, 4000);
AddBook('BookBook5', 5, 5000);
function AddBook(title, quantity, value) {
    let book = {
        title: title,
        quantity: quantity,
        value: value
    }
    store.inventory.push(book);
}

// console.log(store.inventory[0].title);

RestockBook('BookBook3', 1);
RestockBook('Bukbuk3', 1);
function RestockBook(title, quantity) {
    const index = store.inventory.findIndex(function(item, index){
        return item.title === title;
    })
    // console.log(index);
    let searched = store.inventory[index];
    if(searched != null) {
        searched.quantity += quantity;
        console.log(`${searched.title} has been restocked. Current stock: ${searched.quantity}`);
    } else {
        console.log('The Book you\'re trying to restock cannot be found.')
    }
}

SellBook('Bukbuk4', 1);
SellBook('BookBook0', 1);
SellBook('BookBook4', 2);
SellBook('BookBook2', 1);
SellBook('BookBook2', 1);
SellBook('BookBook2', 1);
function SellBook(title, quantity) {
    const index = store.inventory.findIndex(function(item, index){
        return item.title === title;
    })
    let searched = store.inventory[index];
    // console.log(index);
    if(searched != null) {
        if(searched.quantity < quantity) {
            console.log(`${searched.title} is out of stock. Remaining stock: ${searched.quantity}`)
        } else {
            searched.quantity -= quantity;
            let earnings = searched.value * quantity;
            store.earnings += earnings;
            console.log(`SUCCESSFUL TRANSCATION. The store earned: $${earnings} by selling ${quantity} ${quantity < 2 ? 'copy' : 'copies'} of ${searched.title}`);
            console.log(`> Book titled ${searched.title}'s remaining stock: ${searched.quantity}`);
        }
    } else {
        console.log('The Book you\'re looking for cannot be found.')
    }
}

ListInventory();
function ListInventory() {
    for (const item of store.inventory) {
        console.log(`Book Title: ${item.title} | In stock: ${item.quantity} | Price: ${item.value}`);
    }
    console.log(`Total earnings of ${store.name}: ${store.earnings}`)
}

