import query from "../backEndFunctions/backEnd.js";
import factory from "../frontEndFunctions/factoryFunction.js";

import pgPromise from "pg-promise";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pgp = pgPromise();
const db = pgp(connectionString);

const queryFunction = query(db)
const factoryFunction = factory()

export default function render() {

  async function home(req, res, next) {
    let categoryTotals = await queryFunction.categoryTotals()
    
    res.render("home", {categoryTotals});
  }

    async function allexpenses(req, res, next) {
      let expenses = await queryFunction.allExpenses()
        res.render("allexpenses", { expenses });
  }

  async function addExpense(req, res, next) {
    let expense = req.body.expenseInput;
    let amount = req.body.amountInput; 
    let id = req.body.category

    let sampleId = [1, 2, 3, 4, 5, 6]

    let total = 0;
    
    for (var i = 0; i < sampleId.length; i++){
      if (id == 1) {
        total = 0
        total += Number(amount) * 4;
      } else if (id == 2) {
        total = 0;
        total += Number(amount) * 1;
      } else if (id == 3) {
        total = 0;
        total += Number(amount) * 5;
      } else if (id == 4) {
        total = 0;
        total += Number(amount) * 2;
      } else if (id == 5) {
        total = 0;
        total += Number(amount) * 1;
      } else if (id == 6) {
        total = 0;
        total += Number(amount) * 30;
       
      }
    }
   

    queryFunction.addExpense(expense, amount, total, id);
      
    res.redirect("/")
  }
    
  return {
    home,
    allexpenses,
    addExpense,
  };
    
}
