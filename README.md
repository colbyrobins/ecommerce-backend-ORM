# ecommerce-backend-ORM

  

## Description

A back end e-commcerce site using Express.js API and Sequalize to interact with a MySQL database.

## Table of Contents

* [Description](#Description)
* [Table of Contents](#table-of-contents)
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contribution Guidelines](#contribution-guidelines)
* [Test Instructions](#test-instructions)


## Installation

```Bash
git clone https://github.com/colbyrobins/ecommerce-backend-ORM.git -b main

cd ecommerce-backend-ORM

npm install
```

## Usage
Create database in MySQL

```Bash

cd ecommerce-backend-ORM/Develop

mysql -u root -p root

source db/schema.sql

exit

```

Seed database

```Bash
npm run seed

```

Start server

```Bash
npm start

```

Open browser or Insomnia and create http request.

Examples:

- http://localhost:3001/api/tags
- http://localhost:3001/api/products
- http://localhost:3001/api/categories/1

A video tutorial can be found here: https://drive.google.com/file/d/1As6RQM-BhjcNwl8_qtuzBJyqE6HcWy7M/view

## License

N/A

## Contribution Guidelines
N/A

## Test Instructions
N/A


## Questions?

Github Profile: <https://github.com/colbyrobins>

Email me at <colbyr2891@gmail.com> if you have any questions.
