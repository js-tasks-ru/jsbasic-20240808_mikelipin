function sumSalary(salaries) {
  let sum = 0;
  for (let salary of Object.values(salaries)) {
    if (typeof salary === 'number' && 
        !Number.isNaN(salary) && 
        salary !== Infinity && 
        salary !== -Infinity) {
      sum += salary;
    }
  }
  return sum;
}
