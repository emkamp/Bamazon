# Bamazon Walkthrough

## Customer View

On running the bamazoncustomer.js file, the user is presented with a complete list of inventory.

![screenshot1](/screenshots/customerview-01-purchase.PNG)

The user is prompted to select one item from the inventory, then prompted for the quantity.  If the user enters a quantity greater than the available stock, they get an error message and are re-prompted for the quantity.  If they enter a useable number, they see an order confirmation.

![screenshot2](/screenshots/customerview-02-stockchange.PNG)

If you run the app again, you will note that the available stock for the item that was just ordered has been reduced in accordance with that order. This change is persistent, as orders directly update the MySQL database.

## Manager View

On running bamazonmanager.js, the user sees a menu for all of our available functions.

![screenshot2](/screenshots/managerview-01-menu.PNG)

### View Current Inventory

This option shows a list of everything in the database, with visual formatting and currency formatting, then shows the menu again.

![screenshot2](/screenshots/managerview-02-inventoryview.PNG)

### View Low Inventory

This option displays only those items which have fewer than 5 each in stock.  It is similar to **View Current Inventory** in that it is display-only, has the same formatting, and immediately gives the user back to the main menu.

![screenshot2](/screenshots/managerview-03-lowinventoryview.PNG)

### Add to Inventory

On selecting this option, the user is prompted to select which item they wish to edit.  The prompt asks for item ID rather than name in order to reduce the likelihood of typos.

A short confirmation message shows the user which item they have selected, then prompts the user for the quantity they wish to add.  The user can also enter a negative number to reduce the stock.

![screenshot2](/screenshots/managerview-04-addinventory.PNG)

Then, the user is presented with the main menu.  If the user then selects **View Current Inventory**, they will see that the database has been updated. You can't have too many 1973 Ford Falcon XB's :police_car:

### Add New Product

On selecting this option, the user is given instructions on how to enter data for a new inventory item.  It is different from **Add to Inventory** in that rather than adding stock quantity to an existing inventory item, this will add an entirely new row in the database table for a new item.  ID is not available for the user to enter, as it is auto-incremented by MySQL. 

![screenshot2](/screenshots/managerview-05-addnew.PNG)

The Javascript will trim any leading or trailing spaces, and split the string into array items by the comma. The array items are then used to construct the database query which creates the new row in the *products* table.

![screenshot2](/screenshots/managerview-06-addnewdone.PNG)

After the user enters their new product, they see a confirmation message and are again presented with the main menu.  If the user then selects **View Current Inventory**, the new item will be displayed in the list.

### Quit

This option simply ends the database connection, returning the user to the command line.

![screenshot2](/screenshots/managerview-07-quit.PNG)

# To-Do List

Improvement ideas:

- error handling
	- what if manager enters a negative number which would take inventory stock below 0?
	- what if manager enters a new inventory item incorrectly?
	- what if user selects item ID that does not exist?

- final challenge: Supervisor View
- front end using express or handlebars
