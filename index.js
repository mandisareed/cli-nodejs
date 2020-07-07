const fs = require("fs");
const inquirer = require("inquirer");
const CheckboxPrompt = require("inquirer/lib/prompts/checkbox");
const licenses = [
  {
    name: "MIT",
    url: "https://opensource.org/licenses/MIT",
    id: "License-MIT-yellow"
  },
  {
    name: "GNU General Public version 3",
    url: "https://opensource.org/licenses/GPL-3.0",
    id: "License-GPLv3-blue",
  },
  {
    name: "No License",
    url: "http://unlicense.org/",
    id: "license-Unlicense-blue"
  }
];

main();

function printLicenseInfo (licenseName) {
  const license = licenses.find(lic => lic.name ===licenseName)
  console.log(license);
  return `[![License: GPL v3](https://img.shields.io/badge/${license.id}.svg)](${license.url})`
};

function main() {
  userInput()
  .then((answers) => {
    answers.badge = printLicenseInfo(answers.licenseName);

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
  //.catch((error) => console.log(console.log(error));
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
      name: "licenseName",
      choices: licenses.map(license => license.name),
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

//prompt user to choose a license: MIT, GNU GPLv3 , no license
//generate a badge 
//console.log the badge with the correct link
//console.log the selected license




function renderReadMe({
  title,
  description,
  instructions,
  usageinfo,
  contribution,
  test,
  licenseName,
  github,
  email,
  badge,
}) {
  return `
# ${title}

## Description
${description}
* This project is license under ${licenseName}

## Table of Contents
* [Installation](https://github.com/mandisareed/cli-nodejs/blob/master/readme.md#installation)
* [Usage Information](https://github.com/mandisareed/cli-nodejs/blob/master/readme.md#usage)
* [Contributions](https://github.com/mandisareed/cli-nodejs/blob/master/readme.md#contributing)
* [Test Instructions](https://github.com/mandisareed/cli-nodejs/blob/master/readme.md#tests)
* [License Information](https://github.com/mandisareed/cli-nodejs/blob/master/readme.md#license)
* [Questions/Contact](https://github.com/mandisareed/cli-nodejs/blob/master/readme.md#questions)

## Installation
* ${instructions}

## Usage
${usageinfo}

## Contributing
${contribution}

## Tests
${test}

## License
${licenseName}

${badge}

## Questions
[github.com/${github}]

For additional information and/or questions, please email me:
${email}`;
};
