const PERCENTUAL_FOR_SAVINGS = 0.1;

function getPieCharStruct(user) {
  let totalIncomesAdmin = getTotalFromUser(user, 'incomes');
  let totalExpensesAdmin = getTotalFromUser(user, 'expenses');
  let totalIncomesRelative = 0.0;

  if (user.users_family && user.users_family.length > 0) {
    user.users_family.forEach((relative) => {
      const totalIncomesUser = getTotalFromUser(relative, 'incomes');
      relative.total_incomes = totalIncomesUser;
      totalIncomesRelative += totalIncomesUser;
    });
  }

  const totalIncomes = totalIncomesAdmin + totalIncomesRelative;

  let pieChartInfo = [];
  // data from admin
  let userExpensePay = calculateUserExpensePay(
    totalIncomesAdmin,
    totalIncomes,
    totalExpensesAdmin
  );

  pieChartInfo = addUserInformationToPieCharArray(
    user.name,
    userExpensePay,
    pieChartInfo
  );

  user.remaining_amount = totalIncomesAdmin - userExpensePay;
  user.savings_amount = user.remaining_amount * PERCENTUAL_FOR_SAVINGS;
  user.extra_expenses_amount = user.remaining_amount - user.savings_amount;

  //data from the family
  if (user.users_family && user.users_family.length > 0) {
    user.users_family.forEach((relative) => {
      userExpensePay = calculateUserExpensePay(
        relative.total_incomes,
        totalIncomes,
        totalExpensesAdmin
      );
      pieChartInfo = addUserInformationToPieCharArray(
        relative.name,
        userExpensePay,
        pieChartInfo
      );
      relative.total_expenses_contribution = userExpensePay;
    });
  }
  console.log('pie chart');
  console.log(user);
  return pieChartInfo;
}

function addUserInformationToPieCharArray(name, value, array) {
  const userInfo = {
    name,
    value,
  };
  array.push(userInfo);
  return array;
}
function getTotalFromUser(user, nameArray) {
  if (user[nameArray] && user[nameArray].length > 0) {
    const total = user[nameArray].reduce((prev, next) => prev + next.value, 0);
    return total;
  }
  return 0;
}

function calculateUserExpensePay(
  totalIncomesUser,
  totalIncomes,
  totalExpenses
) {
  const userPercent = totalIncomesUser / totalIncomes;
  const userExpensePay = totalExpenses * userPercent;
  return userExpensePay;
}

function getBarChartStruct(user) {
  let barChartInfo = [];

  let totalIncomesAdmin = getTotalFromUser(user, 'incomes');
  let totalExpensesAdmin = getTotalFromUser(user, 'expenses');
  barChartInfo = addUserInformationToArrayBarChart(
    user.name,
    totalIncomesAdmin,
    totalExpensesAdmin,
    barChartInfo
  );

  if (user.users_family && user.users_family.length > 0) {
    user.users_family.forEach((relative) => {
      const totalIncomesUser = getTotalFromUser(relative, 'incomes');
      const totalParticularExpensesUser = getTotalFromUser(
        relative,
        'expenses'
      );
      const totalExpensesUser =
        relative.total_expenses_contribution + totalParticularExpensesUser;
      console.log(totalParticularExpensesUser);
      barChartInfo = addUserInformationToArrayBarChart(
        relative.name,
        totalIncomesUser,
        totalExpensesUser,
        barChartInfo
      );
    });
  }

  return barChartInfo;
}
function addUserInformationToArrayBarChart(name, incomes, expenses, array) {
  const userInfo = {
    name,
    Rendas: incomes,
    Despesas: expenses,
  };
  array.push(userInfo);
  return array;
}
export { getPieCharStruct, getBarChartStruct };
