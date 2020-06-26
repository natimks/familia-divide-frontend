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

  pieChartInfo = addUserInformationToArray(
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
      pieChartInfo = addUserInformationToArray(
        relative.name,
        userExpensePay,
        pieChartInfo
      );
    });
  }

  return pieChartInfo;
}

function addUserInformationToArray(name, value, array) {
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

export { getPieCharStruct };
