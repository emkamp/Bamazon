/*
### Challenge #2: Manager View (Next Level)
x Create a new Node application called `bamazonManager.js`. Running this application will:

  x List a set of menu options:
    x View Products for Sale
    x View Low Inventory
    x Add to Inventory
    x Add New Product

  x If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
  x If a manager selects `View Low Inventory`, then it should list all items with a inventory count lower than five.
  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
*/

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

function getInventory() {
    connection.query('select * from products where product_name is not null', function (err, res) {
        if (err) throw err;
        console.log(bigLine + "\nCURRENT INVENTORY" + bigLine);
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
        // next action
        menu();
    });
}

function lowInventory() {
    connection.query('select * from products where stock_quantity <= 5', function (err, res) {
        if (err) throw err;
        console.log(bigLine + "\nLOW INVENTORY" + bigLine);
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
        // next action
        menu();
    });
}

function addInventory() {
    console.log(smallLine);
    connection.query('select * from products where product_name is not null', function (err, res) {
        inquirer.prompt([{
            name: "itemSelect",
            type: "text",
            message: "Enter the ID of the item you wish to edit"
        }]).then(function (results) {

            var stockId = parseInt(results.itemSelect, 10) - 1;
            var stockCurrent = res[stockId].stock_quantity;
            var stockItem = res[stockId].product_name;
            console.log("You selected: " + stockId + " | " + stockItem);
            console.log(smallLine);

            inquirer.prompt([{
                name: "itemStockChange",
                type: "text",
                message: "Enter the quantity you would like to add to our current inventory"
            }]).then(function (results) {
                var stockChange = parseInt(results.itemStockChange);
                var stockUpdated = stockCurrent + stockChange;
                var queryString = "update products set stock_quantity=" + stockUpdated + " where item_id=" + stockId;
                console.log("Adding " + stockChange + " to our stock of " + stockItem + " for a new stock quantity of " + stockUpdated + " ... ");
                connection.query(queryString, function (err, res) {
                    if (err) throw err;
                    console.log("... done!");
                    menu();
                });
            });
        });
    });
}

function addNewItem() {
    inquirer.prompt([{
        name: "itemCreate",
        type: "text",
        message: "To create a new item, enter its Department, Name, Price (no dollar sign), and Stock Quantity separated by commas.\nExample:\nSpace Ships, Tie Fighter, 900.50, 12\n"
    }]).then(function (results) {
        var newItemArr = results.itemCreate.split(",");
        for (i = 0; i < newItemArr.length; i++) {
            newItemArr[i] = newItemArr[i].trim();
        }
        console.log(smallLine);
        var queryString = "insert into products(department_name, product_name, price, stock_quantity) values('" + newItemArr[0] + "', '" + newItemArr[1] + "', " + parseFloat(newItemArr[2]) + ", " + parseInt(newItemArr[3], 10) + ");";
        var itemPricePretty = currencyFormatter.format(newItemArr[2], { code: 'USD' });
        var itemRow = newItemArr[0] + " > " + newItemArr[1] + " | " + itemPricePretty + " | " + newItemArr[3];
        console.log('Adding new product to database: ' + itemRow);
        connection.query(queryString, function (err, res) {
            if (err) throw err;
            console.log("... done!");
            menu();
        });
    });
}

function menu() {
    console.log(bigLine + "\nMANAGER CONSOLE" + bigLine);
    inquirer.prompt([{
        name: "welcomeSelect",
        type: "list",
        message: "Select a function: ",
        choices: [
            "View Current Inventory",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Quit"
        ]
    }]).then(function (results) {
        console.log(results.welcomeSelect);
        if (results.welcomeSelect == "View Current Inventory") {
            getInventory();
        } else if (results.welcomeSelect == "View Low Inventory") {
            lowInventory();
        } else if (results.welcomeSelect == "Add to Inventory") {
            addInventory();
        } else if (results.welcomeSelect == "Add New Product") {
            addNewItem();
        } else if (results.welcomeSelect == "Quit") {
            connection.end();
        }
    });
}

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    menu();
});