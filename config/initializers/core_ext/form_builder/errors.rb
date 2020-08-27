class ActionView::Helpers::FormBuilder
  def errors(field_name)
    return unless object.errors[field_name].present?

    model_name = object.class.name.downcase
    id = "error_#{model_name}_#{field_name}"
    parent_id = "#{model_name}_#{field_name}"
    string = %{
      <div class="field_with_errors">
        <label id=#{id} for="#{parent_id}" class="field_with_errors">
          #{object.errors[field_name].join(', ')}
        </label>
      </div>
    }
    string.squish.html_safe
  end
end
