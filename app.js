const submitBtn = document.querySelector('.register__form__sunmit')
const fields = document.querySelectorAll('.register__form__field')
const optionsEle = document.querySelectorAll('.option-checkbox')
const priceEle = document.querySelector('.register__form__price')
const succesMessage = document.querySelector('.register__form__succes')

// get price
optionsEle.forEach((option) => [
	(option.onclick = function () {
		const membership = option.value
		if (membership === '6-month') {
			priceEle.innerHTML = '989.000 VND'
		} else {
			priceEle.innerHTML = '1.995.000 VND'
		}
	}),
])

// validate functions
function require(name, value) {
	return value.trim().length > 0 ? null : `Vui lòng nhập ${name}`
}
function phoneValidate(value) {
	const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g
	return regex.test(value.trim()) ? null : 'Số điện thoại không hợp lệ'
}
function emailValidate(value) {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return regex.test(value.trim()) ? null : 'Email không hợp lệ'
}

function validate(name, value) {
	switch (name) {
		case 'name':
			return require('Họ tên', value)
		case 'phone':
			return require('Số điện thoại', value) || phoneValidate(value)
		case 'email':
			return require('Email', value) || emailValidate(value)
		default:
			return null
	}
}

//  remove error message when user focus input
fields.forEach((field) => {
	const inputEle = field.querySelector('.field__input')
	inputEle.onfocus = function () {
		const errorEle = field.querySelector('.field__error')
		errorEle.classList.remove('show')
	}
})

// handle click submit button
function handleSubmit() {
	let isSucces = true

	fields.forEach((field) => {
		const inputEle = field.querySelector('.field__input')
		const name = inputEle.name
		const value = inputEle.value

		const error = validate(name, value)
		if (error) {
			isSucces = false
			const errorEle = field.querySelector('.field__error')
			errorEle.classList.add('show')
			errorEle.innerText = error
			field.appendChild(errorEle)
		}
	})
	if (isSucces) {
		succesMessage.style.display = 'block'
	}
}

submitBtn.addEventListener('click', handleSubmit)
