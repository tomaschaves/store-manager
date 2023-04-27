const products = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const singleProduct = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
];

const productName = 'produtoX';
const objectInsert = { id: 7, name: 'produtoX' };

// const resultInsert = [
//   {
//     fieldCount: 0,
//     affectedRows: 1,
//     insertId: 2,
//     info: '',
//     serverStatus: 2,
//     warningStatus: 0,
//   },
//   undefined,
// ];

// {
  // [
  //   ResultSetHeader {
  //     fieldCount: 0,
  //     affectedRows: 1,
  //     insertId: 4,
  //     info: '',
  //     serverStatus: 2,
  //     warningStatus: 0
  //   },
  //   undefined
  // ]
// };

module.exports = { products, singleProduct, objectInsert /* , resultInsert, productName */ };
