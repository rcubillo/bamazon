// Load the NPM Package inquirer
var inquirer = require('inquirer');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'Chino2015',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
});

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we give the user a list to choose from.
    {
      type: 'list',
      message: 'What do you want to do today?',
      choices: ['See inventory', 'Buy a product'],
      name: 'list'
    }
  ])
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.list === 'See inventory') {
      inventory();
      afterInventory()
    } else {
      selectionPrompt();
    }
  });

function inventory() {
  connection.query('SELECT * FROM products', function(err, res) {
    console.log('===================================================');
    console.log('BAMAZON');
    console.log('Existing Inventory: ');
    console.log('===================================================');
    for (var i = 0; i < res.length; i++) {
      console.log(
        'ID: ' +
          res[i].item_id +
          ' | ' +
          'Product: ' +
          res[i].product_name +
          ' | ' +
          'Department: ' +
          res[i].department_name +
          ' | ' +
          'Price: $' +
          res[i].price +
          ' | ' +
          'QTY: ' +
          res[i].stock_quantity
      );
      console.log('');
    }
  });
}

function selectionPrompt() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'inputId',
        message:
          'Please enter the ID number of the item you would like to purchase.'
      },
      {
        type: 'input',
        name: 'inputNumber',
        message: 'How many units of this item would you like to purchase?'
      }
    ])
    .then(function(userPurchase) {
      //connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.

      connection.query(
        'SELECT * FROM products WHERE item_id=?',
        userPurchase.inputId,
        function(err, res) {
          for (var i = 0; i < res.length; i++) {
            if (userPurchase.inputNumber > res[i].stock_quantity) {
              console.log(
                '==================================================='
              );
              console.log('Insufficient quantity!');
              console.log(
                '==================================================='
              );
            } else {
              //list item information for user for confirm prompt
              console.log('===================================');
              console.log('Awesome! We can fulfull your order.');
              console.log('===================================');
              console.log("You've selected:");
              console.log('----------------');
              console.log('Item: ' + res[i].product_name);
              console.log('Department: ' + res[i].department_name);
              console.log('Price: ' + res[i].price);
              console.log('Quantity: ' + userPurchase.inputNumber);
              console.log('----------------');
              console.log('Total: $' + res[i].price * userPurchase.inputNumber);
              console.log('===================================');

              var newStock = res[i].stock_quantity - userPurchase.inputNumber;
              var purchaseId = userPurchase.inputId;
             confirmPrompt(newStock, purchaseId);
            }
          }
        }
      );
    });
};

function afterInventory() {
  inquirer
    .prompt([
      // Here we give the user a list to choose from.
      {
        type: 'list',
        message: 'What do you want to do?',
        choices: ['Buy a product', 'Exit'],
        name: 'after'
      }
    ])
    .then(function(user) {
      // If the user guesses the password...
      if (user.after === 'Buy a product') {
        selectionPrompt();
      }else {
        process.exit();
      }
    });
};

function confirmPrompt(newStock, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Are you sure you would like to purchase this item and quantity?",
        default: true

    }]).then(function(user) {
        if (user.confirmPurchase === true) {

            //if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased.

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock
            }, {
                item_id: purchaseId
            }], function(err, res) {});

            console.log("=================================");
            console.log("Transaction completed. Thank you.");
            console.log("=================================");
        } else {
            console.log("=================================");
            console.log("No worries. Maybe next time!");
            console.log("=================================");
        }
    });
}


