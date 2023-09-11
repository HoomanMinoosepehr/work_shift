class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :first_name, :last_name, :editted_date

  def editted_date
    date = Date.parse(object.created_at.to_s)
    return date.strftime('%a, %b %d, %Y')
  end
end
