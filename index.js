const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./src/page-template.js');

let team = [];

function init() {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'createTeam',
        message: 'Would you like to generate a team profile?',
      },
    ])
    .then((resp) => {
      if (resp.createTeam) {
        manager();
      }
    });
}

function manager() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: `Manager's name:`,
      },
      {
        type: 'input',
        name: 'id',
        message: `Manager's ID:`,
      },
      {
        type: 'input',
        name: 'email',
        message: `Manager's email:`,
      },
      {
        type: 'input',
        name: 'number',
        message: `Manager's office phone number:`,
      },
    ])
    .then((resp) => {
      const manager = new Manager(resp.name, resp.id, resp.email, resp.number);
      team.push(manager);
      addEmployee();
    });
}

function engineer() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: `Engineer's name:`,
      },
      {
        type: 'input',
        name: 'id',
        message: `Engineer's ID number:`,
      },
      {
        type: 'input',
        name: 'email',
        message: `Engineer's email:`,
      },
      {
        type: 'input',
        name: 'github',
        message: `Engineer's GitHub username:`,
      },
    ])
    .then((resp) => {
      const engineer = new Engineer(
        resp.name,
        resp.id,
        resp.email,
        resp.github
      );
      team.push(engineer);
      addEmployee();
    });
}

function intern() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: `Intern's name:`,
      },
      {
        type: 'input',
        name: 'id',
        message: `Intern's ID:`,
      },
      {
        type: 'input',
        name: 'email',
        message: `Intern's email:`,
      },
      {
        type: 'input',
        name: 'school',
        message: `Intern's school:`,
      },
    ])
    .then((resp) => {
      const intern = new Intern(resp.name, resp.id, resp.email, resp.school);
      team.push(intern);
      addEmployee();
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'role',
        message: 'Add an employee to the team:',
        choices: ['Engineer', 'Intern', 'None'],
      },
    ])
    .then((resp) => {
      if (resp.role === 'Engineer') {
        engineer();
      } else if (resp.role === 'Intern') {
        intern();
      } else {
        generateFile();
      }
    });
}

init();

function generateFile() {
  const html = render(team);
  fs.writeFile(outputPath, html, (err) => {
    if (err) throw err;
    console.log(`Team profile successfully generated at ${outputPath}`);
  });
}
