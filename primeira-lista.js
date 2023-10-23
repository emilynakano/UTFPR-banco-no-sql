/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('bancoprimeiralista');

// 1. Faça uma consulta que retorne todos os funcionários com salário maior ou igual a R$4000
db.empregado.find({ salario: { $gte: 4000 } })

// 2.  Selecione todos os empregados que ganham 500, 1000, 1500, 3000 e 6000 reais de salário.
db.empregado.find({ salario: { $in: [500, 1000, 1500, 3000, 6000] } })

//3. Faça uma alteração no cliente com o nome igual a “Rambo”, criando um campo
//  chamado “curso” (que será um array) e atribuindo a ele os valores “Python” e
//  “JavaScript”. Além disso, crie um campo cidade com e atribua o valor de “Curitiba”.
db.empregado.updateOne( { nome: "Rambo" }, { $set: { curso: ["Python", "JavaScript"], cidade: "Curitiba" } } )

// 4. Altere o curso de “Python” do cliente chamado “Rambo” para “PHP”.
db.empregado.updateOne( { nome: "Rambo" }, { $set: { "curso.$[element]": "PHP" } }, { arrayFilters: [ { "element": "Python" } ] });

// aça uma consulta que retorne todos os empregados que possuem o nome
// começando com “P” e salário maior do que 1000,  ou possuem o nome terminando
// com “a” e salário menor que 9000.
db.empregado.find({ $or: [ { nome: /^P/, salario: { $gt: 1000 } }, { nome: /a$/, salario: { $lt: 9000 } } ] })
