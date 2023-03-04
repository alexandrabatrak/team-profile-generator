// creates the team
const fs = require('fs');
const css = fs.readFileSync('./src/style.css', 'utf-8');

const year = new Date().getFullYear();

const generateTeam = (team) => {
  // creates the manager html
  const generateManager = (manager) => {
    return `
    <div class="card employee-card manager row rounded-0 w-100">
        <div class="card-header col-4 d-flex justify-content-center align-items-center rounded-0">
            <div class="thumbnail mx-auto d-flex justify-content-center align-items-center p-5">
                <i class="fa-solid fa-user-tie fa-4x" aria-hidden="true"></i>
            </div>
        </div>
        <div class="card-body col-8">
        <div class="title">
            <h2 class="card-title">${manager.getName()}</h2>
            <h3 class="card-title fs-4">${manager.getRole()}</h3>
        </div>
        <ul class="list-unstyled mb-0 rounded-0">
            <li class="py-1">
                <i class="fa-solid fa-id-badge" aria-hidden="true">
                    <span class="visually-hidden">ID</span>
                </i>
                ${manager.getId()}
            </li>
            <li class="py-1">
                <i class="fa-solid fa-at" aria-hidden="true">
                    <span class="visually-hidden">Email</span>
                </i>
                <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a>
            </li>
            <li class="py-1">
                <i class="fa-solid fa-phone" aria-hidden="true">
                    <span class="visually-hidden">Office number</span>
                </i>
                ${manager.getOfficeNumber()}
            </li>
        </ul>
        </div>
    </div>`;
  };

  // creates the html for engineers
  const generateEngineer = (engineer) => {
    return `
    <div class="card employee-card row rounded-0 w-100">
        <div class="card-header col-4 d-flex justify-content-center align-items-center rounded-0">
            <div class="thumbnail mx-auto d-flex justify-content-center align-items-center p-5">
                <i class="fa-solid fa-user fa-4x" aria-hidden="true"></i>
            </div>
        </div>
        <div class="card-body col-8">
            <div class="title">
                <h2 class="card-title">${engineer.getName()}</h2>
                <h3 class="card-title fs-4">${engineer.getRole()}</h3>
            </div>
            <ul class="list-unstyled mb-0 rounded-0">
                <li class="py-1">
                    <i class="fa-solid fa-id-badge" aria-hidden="true">
                        <span class="visually-hidden">ID</span>
                    </i>
                    ${engineer.getId()}
                </li>
                <li class="py-1">
                    <i class="fa-solid fa-at" aria-hidden="true">
                        <span class="visually-hidden">Email</span>
                    </i>
                    <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a>
                </li>
                <li class="py-1">
                    <i class="fa-brands fa-github" aria-hidden="true">
                        <span class="visually-hidden">GitHub</span>
                    </i>
                    <a
                    href="https://github.com/${engineer.getGithub()}"
                    target="_blank"
                    rel="noopener noreferrer"
                    >${engineer.getGithub()}</a
                    >
                </li>
            </ul>
        </div>
    </div>`;
  };

  // creates the html for interns
  const generateIntern = (intern) => {
    return `
    <div class="card employee-card row rounded-0 w-100">
        <div class="card-header col-4 d-flex justify-content-center align-items-center rounded-0">
            <div class="thumbnail mx-auto d-flex justify-content-center align-items-center p-5">
                <i class="fa-solid fa-user fa-4x" aria-hidden="true"></i>
            </div>
        </div>
        <div class="card-body col-8">
            <div class="title">
                <h2 class="card-title">${intern.getName()}</h2>
                <h3 class="card-title fs-4">${intern.getRole()}</h3>
            </div>
            <ul class="list-unstyled mb-0 rounded-0">
                <li class="py-1">
                    <i class="fa-solid fa-id-badge" aria-hidden="true">
                        <span class="visually-hidden">ID</span>
                    </i>
                    ${intern.getId()}
                </li>
                <li class="py-1">
                    <i class="fa-solid fa-at" aria-hidden="true">
                        <span class="visually-hidden">Email</span>
                    </i>
                    <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a>
                </li>
                <li class="py-1">
                    <i class="fa-solid fa-graduation-cap" aria-hidden="true">
                        <span class="visually-hidden">School</span>
                    </i>
                    ${intern.getSchool()}
                </li>
            </ul>
        </div>
    </div>`;
  };

  const html = [];
  html.push(
    team.teamMembers
      .filter((employee) => employee.getRole() === 'Manager')
      .map((manager) => generateManager(manager))
  );
  html.push(
    team.teamMembers
      .filter((employee) => employee.getRole() === 'Engineer')
      .map((engineer) => generateEngineer(engineer))
      .join('')
  );
  html.push(
    team.teamMembers
      .filter((employee) => employee.getRole() === 'Intern')
      .map((intern) => generateIntern(intern))
      .join('')
  );

  return html.join('');
};

// exports function to generate entire page
module.exports = (team) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>The Team</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600&display=swap" rel="stylesheet">
    <style>${css}</style>
    <script src="https://kit.fontawesome.com/f549d17040.js" crossorigin="anonymous"></script>
</head>

<body>
    <main>
        <div class="polka-dot z-n1"></div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 col-md-3 m-0 p-0 h-100">
                    <div class="team-heading">
                        <h1 class="py-5 px-3 text-lowercase">${
                          team.teamName
                        }</h1>
                    </div>
                </div>
                <div class="content col-sm-12 col-md-9">
                    <div class="container">
                        <div class="row">
                            <div class="team-area py-5">
                            ${generateTeam(team)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer class="p-3 bg-white z-1">
        <div class="container">
            <p class="mb-0 text-end">
                Made with ❤ & <a href="https://github.com/alexandrabatrak/team-profile-generator">Team profile generator</a>. Copyright &copy; ${year} <a href="https://github.com/alexandrabatrak">Alexandra Batrak</a>
            </p>
        </div>
    </footer>
</body>
</html>`;
};
