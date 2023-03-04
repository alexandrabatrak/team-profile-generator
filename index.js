const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const { html_beautify } = require('js-beautify');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./src/page-template.js');

const team = {
  teamName: '',
  teamMembers: [],
};

const teamName = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'teamName',
        message: `What's the name of the team?`,
      },
    ])
    .then((resp) => {
      team.teamName = resp.teamName;
      createManager();
    });
};

const createManager = () => {
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
        message: `Manager's ID number:`,
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
      team.teamMembers.push(manager);
      addEmployee();
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'role',
        message: 'Add an employee to the team:',
        choices: ['Engineer', 'Intern', 'No more team members'],
      },
    ])
    .then((resp) => {
      switch (resp.role) {
        case 'Engineer':
          createEmployee('Engineer', Engineer);
          break;
        case 'Intern':
          createEmployee('Intern', Intern);
          break;
        default:
          generateFile();
          break;
      }
    });
};

const createEmployee = (role, EmployeeType) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: `${role}'s name:`,
      },
      {
        type: 'input',
        name: 'id',
        message: `${role}'s ID number:`,
      },
      {
        type: 'input',
        name: 'email',
        message: `${role}'s email:`,
      },
      ...(role === 'Engineer'
        ? [
            {
              type: 'input',
              name: 'github',
              message: `Engineer's GitHub username:`,
            },
          ]
        : []),
      ...(role === 'Intern'
        ? [
            {
              type: 'input',
              name: 'school',
              message: `Intern's school:`,
            },
          ]
        : []),
    ])
    .then((resp) => {
      const employee = new EmployeeType(
        resp.name,
        resp.id,
        resp.email,
        resp[role.toLowerCase() === 'engineer' ? 'github' : 'school']
      );
      team.teamMembers.push(employee);
      addEmployee();
    });
};

const generateFile = () => {
  const html = render(team);
  const betterhtml = html_beautify(html, { indent_size: 2 });
  fs.writeFile(outputPath, betterhtml, (err) => {
    if (err) throw err;
    console.log(`Team profile successfully generated at ${outputPath}`);
  });
};

const init = () => {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'createTeam',
        message: 'Would you like to create a team?',
      },
    ])
    .then((resp) => {
      if (resp.createTeam) {
        teamName();
      }
    });
};
init();
