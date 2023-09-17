class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :first_name, :last_name, :join_date

  def join_date
    date = Date.parse(object.created_at.to_s)
    return date.strftime('%a, %b %d, %Y')
  end
end
