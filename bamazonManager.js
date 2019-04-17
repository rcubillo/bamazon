// Load the NPM Package inquirer
var inquirer = require('inquirer');

// Load my password
var login = require('./login');

// Load the NPM Package mysql
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: login.password,
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  principal();
});

// Load the NPM Package inquirer
var inquirer = require('inquirer');

// Created a series of questions

//This is the main function where show the manager the different options.
function principal() {
    console.log("");
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'doingWhat',
        message: 'Welcome Manager. What do you want to do today?',
        choices: [
          'View Products for sale',
          'View Low Inventory',
          'Add to Inventory',
          'Add New Product',
          'Exit'
        ]
      }
    ])
    .then(function(manager) {
      if (manager.doingWhat === 'View Products for sale') {
        inventory();
      } else if (manager.doingWhat === 'View Low Inventory') {
        lowInventory();
      } else if (manager.doingWhat === 'Add New Product') {
         addNewProduct();
      } else if (manager.doingWhat === 'Add to Inventory') {
        addToInventory();
      }else {
          process.exit();
      }
    });
}

//Function that shows the actual Inventory.
function inventory() {
  connection.query('SELECT * FROM products', function(err, res) {
    console.log("");
    console.log('===================================================');
    console.log('BAMAZON');
    console.log('Existing Inventory: ');
    console.log('===================================================');
   console.log("");
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
    principal();
  });
}

//Functions that shows the low inventory.
function lowInventory() {
  connection.query('SELECT * FROM products', function(err, res) {
    for (var i = 0; i < res.length; i++) {
      //List all items with an inventory count lower than five.

      if (res[i].stock_quantity <= 5) {
        console.log('');
        console.log('Low Inventory');
        console.log('=============================================');
        console.log('');
        console.log('Id: ' + res[i].item_id);
        console.log('Department: ' + res[i].department_name);
        console.log('Product: ' + res[i].product_name);
        console.log('Quantity: ' + res[i].stock_quantity);
        console.log('');
      }
    }
    principal();
  });
}

//Functions that add a new product to the inventory
function addToInventory() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'id',
        message:
          'Enter the Id of the product you would like to add to inventory'
      },
      {
        type: 'input',
        name: 'amount',
        message:
          'Amount of products you want to add to inventory?'
      }
    ])
    .then(function(manager) {
      connection.query(
        'UPDATE products SET ? WHERE ?',
        [
          {
            stock_quantity: manager.amount
          },
          {
            item_id: manager.id
          }
        ],
        function(err, res) {}
      );
      console.log("");
      console.log("Awesome. Your inventory has been updated. Now BAMAZON has ");
      console.log("");
     principal();
    });
}

function addNewProduct(){
    inquirer.prompt([{

            type: "input",
            name: "inputName",
            message: "Name of the new product: ",
        },
        {
            type: "input",
            name: "inputDepartment",
            message: "Department name:",
        },
        {
            type: "input",
            name: "inputPrice",
            message: "Price of the product: ",
        },
        {
            type: "input",
            name: "inputStock",
            message: "Quantity of the product: ",
        }

    ]).then(function(manager) {

      //connect to database, insert column data with input from user

      connection.query("INSERT INTO products SET ?", {
        product_name: manager.inputName,
        department_name: manager.inputDepartment,
        price: manager.inputPrice,
        stock_quantity: manager.inputStock
      }, function(err, res) {});
      principal();
    });

  }