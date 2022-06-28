const Table = require('cli-table')
const chalk = require('chalk')

const table = new Table({
  head: ['Template Name', 'Owner/Name', 'Branch'],
  style: {
    head: ['green'],
  },
})

function listTable(tplList) {
  const list = Object.keys(tplList)

  if (!list.length) {
    console.log(table.toString())
  }

  list.forEach((key) => {
    table.push([key, tplList[key]['owner/name'], tplList[key]['branch']])
    if (table.length === list.length) {
      console.log(table.toString())
    }
  })
}

exports.listTable = listTable
