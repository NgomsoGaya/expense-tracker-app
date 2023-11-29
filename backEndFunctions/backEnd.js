export default function query(db) {
    async function addExpense(expense, amount, total, categoryId) {

        await db.none(
          "INSERT INTO expense (expense, amount, total, category_id) values ($1, $2, $3, $4)",
          [expense, amount, total, categoryId]
        );
        
    }
    async function allExpenses() {
        const expenses = await db.manyOrNone("SELECT * FROM expense")

        return expenses
    }

    async function expensesForCategory(categoryId) {
        const expensesFoEachCategory = await db.any("SELECT * FROM expense WHERE category_id =$1", [categoryId])

        return expensesFoEachCategory; 
    }

    async function deleteExpense(expenseId) {
        await db.none("DELETE FROM expense WHERE id = $1", [expenseId])
    }
    async function categoryTotals() {
        let massTotal = 0
        const weekly = await db.manyOrNone("SELECT * FROM expense WHERE category_id =$1", [1])
        let weeklysum = 0;
        for (const week of weekly) {
            weeklysum += Number(week.total);
            massTotal += Number(week.total);
        }

        const monthly = await db.manyOrNone("SELECT * FROM expense WHERE category_id =$1", [2]);
        let monthlysum = 0;
        for (const month of monthly) {
            monthlysum += Number(month.total);
            massTotal += Number(month.total)
        }

        const weekday = await db.manyOrNone("SELECT * FROM expense WHERE category_id =$1", [3]);
         let weekdaysum = 0;
         for (const weekDay of weekday) {
             weekdaysum += Number(weekDay.total);
             massTotal += Number(weekDay.total);
         }
        
        const weekend = await db.manyOrNone("SELECT * FROM expense WHERE category_id =$1", [4]);
         let weekendsum = 0;
         for (const weekEnd of weekend) {
             weekendsum += Number(weekEnd.total);
             massTotal += Number(weekEnd.total);
         }
        const onceOff = await db.manyOrNone("SELECT * FROM expense WHERE category_id =$1", [5]);
        let onceoffsum = 0
        for (const onceoff of onceOff) {
            onceoffsum += Number(onceoff.total)
            massTotal += Number(onceoff.total);
        }
        const daily = await db.manyOrNone("SELECT * FROM expense WHERE category_id =$1", [6]);
        let dailysum = 0;
        for (const eachday of daily) {
            dailysum += Number(eachday.total);
            massTotal += Number(eachday.total);
        }
        return {
          weekly: weeklysum,
          monthly: monthlysum,
          weekday: weekdaysum,
          weekend: weekendsum,
          onceOff: onceoffsum,
          daily: dailysum,
          mass: massTotal
        };
    }
    async function clearExpenses() {
      return db.none("DELETE FROM expenses");
    }


    return {
      addExpense,
      allExpenses,
      expensesForCategory,
      deleteExpense,
      categoryTotals,
      clearExpenses,
    };
}