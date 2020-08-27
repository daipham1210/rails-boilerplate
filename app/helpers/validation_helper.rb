module ValidationHelper
  def data_validate(constraint)
    { 
      target: 'validate.input', 
      validate: constraint,
      action: 'keyup->validate#handleChange'
    }
  end
end

