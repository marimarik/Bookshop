let form = document.getElementById('form')
let name = document.getElementById('name')
let surname = document.getElementById('surname')
let deliveryDate = document.getElementById('date')
let street = document.getElementById('street')
let houseNumber = document.getElementById('house-number')
let flatNumber = document.getElementById('flat-number')
let cash = document.getElementById('cash')
let card = document.getElementById('card')
let pack = document.getElementById('pack')
let postcard = document.getElementById('postcard')
let discount = document.getElementById('discount')
let pen_pencil = document.getElementById('pen-pencil')
let completeBtn = document.querySelector('.complete-button')

function addCondition(input) {
    input.addEventListener('blur', function () {
        if (input.checkValidity() == true) {
            input.style.borderColor = '#c0c0c0'
        } else if (input.checkValidity() == false) {
            input.style.borderColor = 'red'
            input.reportValidity()
        }
    })
}

addCondition(name)
addCondition(surname)

//delivery date
let today = new Date()
let tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow = tomorrow.toISOString().split('T')[0]
deliveryDate.setAttribute('min', tomorrow)

addCondition(street)

//house number
houseNumber.addEventListener('blur', function () {
    if (Number(houseNumber.value) > 0) {
        houseNumber.setCustomValidity('')
    } else if (houseNumber.value == '') {
        houseNumber.setCustomValidity('Field can not be left empty')
    } else if (Number(houseNumber.value) <= 0) {
        houseNumber.setCustomValidity('Positive numbers only')
    } else {
        houseNumber.setCustomValidity('')
    }

    if (houseNumber.checkValidity() == true) {
        houseNumber.style.borderColor = '#c0c0c0'
    } else if (houseNumber.checkValidity() == false) {
        houseNumber.style.borderColor = 'red'
        houseNumber.reportValidity()
    }
})

houseNumber.addEventListener('input', function () {
    if (Number(houseNumber.value) > 0) {
        houseNumber.setCustomValidity('')
    } else if (houseNumber.value == '') {
        houseNumber.setCustomValidity('Field can not be left empty')
    } else if (Number(houseNumber.value) <= 0) {
        houseNumber.setCustomValidity('Positive numbers only')
    } else {
        houseNumber.setCustomValidity('')
    }
})

flatNumber.addEventListener('blur', function (e) {
    if (flatNumber.value == 0) {
        flatNumber.setCustomValidity('Positive numbers only')
    } else if (Number(flatNumber.value) == 0) {
        flatNumber.setCustomValidity('')
    } else if (Number(flatNumber.value) > 0) {
        flatNumber.setCustomValidity('')
    } else if (flatNumber.value == '') {
        flatNumber.setCustomValidity('Field can not be left empty')
    } else if (!/\d/.test(flatNumber.value)) {
        flatNumber.setCustomValidity('Field can not be left empty')
    } else if (Number(flatNumber.value) <= 0) {
        flatNumber.setCustomValidity('Positive numbers only')
    } else {
        flatNumber.setCustomValidity('')
    }

    if (flatNumber.checkValidity() == true) {
        flatNumber.style.borderColor = '#c0c0c0'
    } else if (flatNumber.checkValidity() == false) {
        flatNumber.style.borderColor = 'red'
        flatNumber.reportValidity()
    }
})
flatNumber.addEventListener('input', function () {
    if (flatNumber.value == 0) {
        flatNumber.setCustomValidity('Positive numbers only')
    } else if (Number(flatNumber.value) == 0) {
        flatNumber.setCustomValidity('')
    } else if (Number(flatNumber.value) > 0) {
        flatNumber.setCustomValidity('')
    } else if (flatNumber.value == '') {
        flatNumber.setCustomValidity('Field can not be left empty')
    } else if (Number(flatNumber.value) <= 0) {
        flatNumber.setCustomValidity('Positive numbers only')
    } else {
        flatNumber.setCustomValidity('')
    }
})
// //checkbox
let checkboxContainer = document.querySelector('.choose-gifts')
let checkboxes = Array.from(checkboxContainer.querySelectorAll('input'))

checkboxes.forEach((e) => {
    e.addEventListener('change', function () {
        let checkedItems = checkboxes.filter((item) => item.checked)
        if (checkedItems.length > 2) {
            this.checked = false
        }
    })
})

//complete button
form.addEventListener('input', function () {
    if (form.checkValidity()) {
        completeBtn.classList.add('active')
    } else {
        completeBtn.classList.remove('active')
    }

    form.addEventListener('submit', (e) => {
        if (form.checkValidity() == false) {
            e.preventDefault()
        }
    })
})

//after submitting the form
let summerise = document.querySelector('.summerise')
let sumName = document.querySelector('.sum-name')
let sumSurname = document.querySelector('.sum-surname')
let sumStreet = document.querySelector('.sum-street')
let sumHouseNumber = document.querySelector('.sum-house-number')
let sumFlatNumber = document.querySelector('.sum-flat-number')
let sumDeliveryDate = document.querySelector('.sum-delivery-date')
let sumPaymentType = document.querySelector('.sum-payment-type')
let sumExitBtn = document.querySelector('.summerise-exit')

form.addEventListener('submit', function (e) {
    sumName.textContent = name.value
    sumSurname.textContent = surname.value
    sumStreet.textContent = street.value
    sumHouseNumber.textContent = houseNumber.value
    sumFlatNumber.textContent = flatNumber.value
    sumDeliveryDate.textContent = deliveryDate.value
    //radio buttons
    let paymentTypeDiv = document.querySelector('.payment-type')
    let selectedRadio = paymentTypeDiv.querySelector(
        "input[name='payment-type']:checked"
    )
    sumPaymentType.textContent = selectedRadio.value
    summerise.classList.remove('inactive')
    e.preventDefault()
})

//summerise exit button
sumExitBtn.addEventListener('click', function () {
    summerise.classList.add('inactive')
})
