/**
 * 例子参考: https://github.com/SBoudrias/Inquirer.js/tree/master/packages/inquirer/examples
 */

const inquirer = require("inquirer");

const { prompt } = inquirer;

const question = [
  {
    type: 'input',
    // type: 'confirm',
    // type: 'list',
    // type: 'rawlist',
    // type: 'expand',
    // type: 'checkbox',
    // type: 'password',
    // type: 'editor',
    name: 'name',
    message: 'What is this:',

    // type为list or rawlist必须使用choices
    // choices: ['a', 'b', 'c'], 

    // expand 需要以下choices
    // choices: [
    //   {
    //     key: 'p',
    //     name: 'Pepperoni and cheese',
    //     value: 'PepperoniCheese'
    //   },
    //   {
    //     key: 'a',
    //     name: 'All dressed',
    //     value: 'alldressed'
    //   },
    //   {
    //     key: 'w',
    //     name: 'Hawaiian',
    //     value: 'hawaiian'
    //   }
    // ],

    // checkbox 使用以下choices
    // choices: [
    //   new inquirer.Separator(' = The Meats = '),
    //   {
    //     name: 'Pepperoni'
    //   },
    //   {
    //     name: 'Ham'
    //   },
    //   {
    //     name: 'Ground Meat'
    //   },
    //   {
    //     name: 'Bacon'
    //   },
    // ],
    validate (val) {
      if (val === 'test') {
        return 'this is existed!'
      } else if (val === '') {
        return 'Name is required!'
      } else {
        return true
      }
    }
  }
]

prompt(question).then((args) => {
  console.log('res---', args)
});
