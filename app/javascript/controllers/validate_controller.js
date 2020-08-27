import { Controller } from "stimulus"
import validate from "validate.js"

const errorClass = 'field_with_errors'

export default class extends Controller {
  static targets = ['form', 'submit', 'input']


  submitForm(event) {
    event.preventDefault()
    
    const errors = validate(this.formTarget, this.constraints())

    if (errors == null) {
      this.formTarget.submit()
    } else {
      this.showErrors(errors || {})
    }
  }

  isShowError(input) {
    return document.getElementById(`error_${input.name}`) != null
  }

  handleChange(event) {
    const input = event.currentTarget
    if (this.isShowError(input)) {
      const inputName = input.name
      const inputObj = {[inputName]: input.value }
      const constraintObj = {[inputName]: JSON.parse(input.getAttribute('data-validate'))}

      const error = validate(inputObj, constraintObj)

      if (error == null) {
        document.getElementById(`error_${inputName}`).remove()
        input.parentElement.classList.remove(errorClass)
      } else {
        this.showErrorsForInput(input, error[inputName])
      }
    }
  }

  showErrors(errors) {
    for (let input of this.inputTargets) {
      this.showErrorsForInput(input, errors[input.name])
    }
  }

  constraints(){
    let constraints = {}
    for (let input of this.inputTargets) {
      constraints[input.name] = JSON.parse(input.getAttribute('data-validate'))
    }
    return constraints
  }

  showErrorsForInput(input, errors) {
    this.clearErrors(input)
    if (errors) {
      input.parentElement.classList.add(errorClass)
      this.insertErrorMessages(input, errors)
    } else {
      input.parentElement.classList.remove(errorClass)
      // input.parentElement.classList.add('has-success')
    }
  }

  clearErrors(input) {
    if (this.isShowError(input)) {
      document.getElementById(`error_${input.name}`).remove()
    }
  }

  insertErrorMessages(input, errors) {
    const html = document.createElement('div')
    html.innerHTML = errors.join(' ')
    html.id = `error_${input.name}`
    input.after(html)
  }
}

