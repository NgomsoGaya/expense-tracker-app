import assert from "assert";
import query from "../backEndFunctions/backEnd.js";
import pgPromise from "pg-promise";
const pgp = pgPromise();

// Use a separate test database
const testConnectionString =
  process.env.test_connection_string ||
  "postgres://esfhfbwk:TyKoJ8oGheEdnaHBnnFh9gxTzzjvaoAr@ella.db.elephantsql.com/esfhfbwk";

const db = pgp(testConnectionString);

describe("Testing the expense-tracker app", () => {
//   this.timeout(20000)
 beforeEach(async () => {
   try {
     let queryFunction = query(db);
     await queryFunction.clearExpenses(); // Assuming you have a function to clear expenses
   } catch (error) {
     console.log(error);
   }
 });

 // Teardown
 afterEach(async () => {
   try {
     let queryFunction = query(db);
     await queryFunction.clearExpenses(); // Assuming you have a function to clear expenses
   } catch (error) {
     console.log(error);
   }
 });
  it("it should be able to add an expense", async () => {
      try {
          let queryFunction = query(db)
          
          await queryFunction.addExpense("Lunch", 50, (50 * 5), 3)
          
          let expenses = await queryFunction.allExpenses()
        
          assert.deepEqual(expenses, [
            {
              amount: "50",
              category_id: 3,
              expense: "Lunch",
              id: 2,
              total: "250",
            },
          ]);
    } catch (error) {
        console.log(error);
    }
  });
    
  it("it should calculate totals correctly", async () => {
    try {
      let queryFunction = query(db);

        await queryFunction.addExpense("Ticket", 15, 15 * 5, 3);
        await queryFunction.addExpense("Movie", 80, 80 * 5, 5);

      let Total = await queryFunction.categoryTotals()

      assert.deepEqual(Total.mass, 490)
    } catch (error) {
      console.log(error);
    }
  });

});
