const { listTable } = require(`../utils`)

let tplList = require('../../templates')

const list = () => {
  listTable(tplList)
}

module.exports = list()
