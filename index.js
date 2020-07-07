const fs = require("fs");
const inquirer = require("inquirer");
const CheckboxPrompt = require("inquirer/lib/prompts/checkbox");

main();
function main() {
  userInput().then((answers) => {
    const readMe = renderReadMe(answers);
    console.log(readMe);
    fs.writeFile("readme.md", readMe, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Created readme file!");
      }
    });
  });
}

function userInput() {
  const questions = [
    {
      type: "input",
      message: "What is the title of your project?",
      name: "title",
    },

    {
      type: "input",
      message: "Type a description of your project.",
      name: "description",
    },

    {
      type: "input",
      message: "Type instructions to install your project.",
      name: "instructions",
    },

    {
      type: "input",
      message: "Type information regarding usage.",
      name: "usageinfo",
    },

    {
      type: "input",
      message: "Enter contribution guidelines.",
      name: "contribution",
    },

    {
      type: "input",
      message: "Enter instructions on how to test the project.",
      name: "test",
    },

    {
      type: "list",
      message: "Choose a license.",
      name: "license",
      choices: ["Mozilla Public License 2.0", "The Perl License"],
    },

    {
      type: "input",
      message: "Enter your Github username:",
      name: "github",
    },

    {
      type: "input",
      message: "Enter your email address:",
      name: "email",
    },
  ];
  return inquirer.prompt(questions);
}

// const userData = {
// 	"title": "demo",
// 	"description": "easy",
// 	"instructions": "install em",
// 	"usageinfo": "use it",
// 	"contribution": "thanks",
// 	"test": "try it",
// 	"license": "A",
// 	"github": "disa",
// 	"email": "disagmail"
// };

//const readMe = renderReadMe(userData);
//console.log(readMe);
//const licenseA = [![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
//const licenseB = [![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)
function renderReadMe({
  title,
  description,
  instructions,
  usageinfo,
  contribution,
  test,
  license,
  github,
  email,
}) {
  return `
# ${title}

## Description
${description}
* ${license}

## Table of Contents
* [Installation](link)
* [Usage Information](link)
* [Contributions](link)
* [Test Instructions](link)
* [License Information](link)
* [Questions/Contact](link)

## Installation
* ${instructions}

## Usage
${usageinfo}

## Contributing
${contribution}

## Tests
${test}

## License
${license}

## Questions
[github.com/${github}]

For additional information and/or questions, please email me:
${email}`;
};
