import storage from 'localforage'

export function addExpense (expense) {
  storage.setItem(expense.id, expense).then(function (value) {
    console.log(value)
  }).catch(function (err) {
    console.log(err)
  })
}
