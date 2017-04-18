var mysql = require('mysql');
var inquirer = require('inquirer');
var currencyFormatter = require('currency-formatter');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'dbpass',
    database: 'bamazon'
});

var bigLine = "\n==============================================================================";
var smallLine = "\n------------------------------------------------------------------------------";


function askUserQuantity(chosenItem) {
    console.log(" ");
    inquirer.prompt([{
        name: "userChoiceQuantity",
        type: "text",
        message: "How many do you want to buy?",
    }]).then(function (results) {
        var chosenQuantity = parseInt(results.userChoiceQuantity, 10);

        var itemPrice = parseFloat(chosenItem.price);
        var itemPricePretty = currencyFormatter.format(itemPrice, { code: 'USD' });

        var availableQuantity = parseInt(chosenItem.stock_quantity, 10);

        var totalPrice = chosenQuantity * itemPrice;
        var totalPricePretty = currencyFormatter.format(totalPrice, { code: 'USD' });

        if (chosenQuantity <= availableQuantity) {
            var newStock = availableQuantity - chosenQuantity;
            var queryString = "update products set stock_quantity=" + newStock + " where item_id=" + chosenItem.item_id;
            connection.query(queryString);
            console.log(bigLine + "\nORDER CONFIRMATION" + bigLine);
            console.log("Item Name  |  Price Each  ×  Order Quantity  =  Your Total" + smallLine);
            console.log(chosenItem.product_name + "  |  " + itemPricePretty + "  ×  " + chosenQuantity + "  =  " + totalPricePretty);
            console.log("\nThank you for your business!\nOur " + chosenItem.department_name + " Department will prepare and ship your order right away.");
    connection.end();

        } else {
            console.log("We only have " + availableQuantity + " in stock! Please enter a reasonable quantity.");
            askUserQuantity(chosenItem);
        }
    });
}

function askUser(res) {
    console.log(" ");
    inquirer.prompt([{
        name: "userChoiceItem",
        type: "text",
        message: "Enter the ID for the item you are interested in:"
    }]).then(function (results) {
        var i = results.userChoiceItem;
        var chosenItem = res[i - 1];
        var itemDesc = chosenItem.product_name;
        var itemQuantity = chosenItem.stock_quantity;

        var itemPrice = chosenItem.price;
        var itemPricePretty = currencyFormatter.format(itemPrice, { code: 'USD' });

        console.log("You selected #" + i + ": " + itemDesc + ". We have " + itemQuantity + " in stock at " + itemPricePretty + " each.");
        askUserQuantity(chosenItem);
    });
}

function getInventory() {
    connection.query('select * from products where product_name is not null', function (err, res) {
        if (err) throw err;
        console.log("CURRENT INVENTORY" + bigLine);
        console.log("ID |  Department  |  Product  | Price | # In Stock" + smallLine);
        for (i = 0; i < res.length; i++) {
            var itemPricePretty = currencyFormatter.format(res[i].price, { code: 'USD' });
            var itemRow = res[i].item_id + " | " + res[i].department_name + " > " + res[i].product_name + " | " + itemPricePretty + " | " + res[i].stock_quantity;
            if (res[i].item_id < 10) {
                // add a leading space to keep the column even
                console.log(" " + itemRow);
            } else {
                console.log(itemRow);
            }
        }
        askUser(res);
    });
}

/*
7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.
*/

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    console.log(bigLine);
    getInventory();
});