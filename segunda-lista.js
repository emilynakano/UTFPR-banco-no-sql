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
use('bancosegundalista');

// 1. Faça uma consulta que retorne quantos pedidos existem na coleção “pedido”.
db.pedido.count()

// 2. Faça uma consulta que retorne a soma do campo “total” de todos os pedidos
// existentes na coleção “pedido”

db.pedido.aggregate([
  {$group: {_id: null, total: {$sum: "$total"}}}
])

// 3. Faça uma consulta que retorne a soma do campo total agrupado por cliente (o total
// que cada cliente comprou). Ordene o resultado por total de forma ascendente.
db.pedido.aggregate([
  {$group: {_id: "$id_cliente", total: {$sum: "$total"}}},
  {$sort: {total: 1}}
])

// 4. Faça uma consulta que retorne a soma dos totais de todos os pedidos agrupados
// por cliente e por data. Basicamente, precisamos saber o total que cada cliente
// comprou agrupado por data.
db.pedido.aggregate([
  {$group: {_id: {id_cliente: "$id_cliente", data: { $dateToString: { format: "%Y-%m-%d", date: "$data"}}}, total: {$sum: "$total"}}}
])

// 5. Faça uma consulta que retorne quantos pedidos cada cliente efetuou. Mostre
// apenas os clientes que possuem mais do que 1 pedido.
db.pedido.aggregate([
  {$group: {_id: "$id_cliente", total: {$sum: 1}}},
  {$match: {total: {$gt: 1}}}
])


// 6. Faça uma consulta que retorne a soma dos totais de todos os pedidos agrupados
// por cliente e que estejam com o status em aberto (“A”). Mostre apenas documentos
// cujo o soma total dos pedidos por cliente e por dia sejam superiores a R$80.
db.pedido.aggregate([
  {$match: {status: "A"}},
  {$group: {_id: {id_cliente: "$id_cliente", data: { $dateToString: { format: "%Y-%m-%d", date: "$data"}}}, total: {$sum: "$total"}}},
  {$match: {total: {$gt: 80}}}
])

// 7. Faça uma consulte que retorne quantos produtos foram vendidos (somar a
// quantidade de todos os itens dos pedidos).
db.pedido.aggregate([
  {$unwind: "$items"},
  {$group: {_id: null, total: {$sum: "$items.quantidade"}}}
])


