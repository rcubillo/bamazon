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
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'doingWhat',
        message: 'Welcome Manager. What do you want to do today?',
        choices: [
          'View Products for Sale',
          'View Low Inventory',
          'Add to Inventory',
          'Add New Product',
          'Exit'
        ]
      }
    ])
    .then(function(manager) {
      if (manager.doingWhat === 'View Products for Sale') {
        inventory();
      } else if (manager.doingWhat === 'View Low Inventory') {
        lowInventory();
      }else if (manager.doingWhat === 'Exit'){
          process.exit();
      }

    });
}

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
    principal();
  });
}

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


