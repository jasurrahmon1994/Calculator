
let calculateIt = document.querySelector('#loan-form');



calculateIt.addEventListener('submit', (e) => {
    document.querySelector('#loading').style.display = 'block';
    document.querySelector('#results').style.display = 'none';
    setTimeout(calculateLoan, 1000);

    e.preventDefault()
})

function calculateLoan() {
    let amount = document.querySelector('#amount');
    let interest = document.querySelector('#interest');
    let years = document.querySelector('#years');
    let monthlyPayment = document.querySelector('#monthly-payment');
    let totalPayment = document.querySelector('#total-payment');
    let totalInterest = document.querySelector('#total-interest');
    let principal = parseFloat(amount.value)
    let calculatedInterest = parseFloat(interest.value) / 100 / 12
    let calculatedPayment = parseFloat(years.value) * 12

    let x = Math.pow(1 + calculatedInterest, calculatedPayment)
    let monthly = (principal * x * calculatedInterest) / (x - 1)
    if (amount.value > 0 && interest.value > 0 && years.value > 0) {
        if (isFinite(monthly)) {
            console.log('Calculating...');
            monthlyPayment.value = monthly.toFixed(2)
            totalPayment.value = (monthly * calculatedPayment).toFixed(2)
            totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2)
            document.querySelector('#loading').style.display = 'none';
            document.querySelector('#results').style.display = 'block';
        } else {
            document.querySelector('#loading').style.display = 'none';
            document.querySelector('#results').style.display = 'none';
            showError('Please, check your numbers')
        }
    } else {
        document.querySelector('#loading').style.display = 'none';
        document.querySelector('#results').style.display = 'none';
        showError('Please, enter valid values')
    }

}

function showError(error) {
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv, heading)
    setTimeout(() => {
        document.querySelector('.alert').remove()
    }, 2500);
}
