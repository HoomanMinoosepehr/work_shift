class CompanySerializer < ActiveModel::Serializer
  attributes :id, :full_name, :first_name, :last_name, :email,:join_date

  def join_date
    date = Date.parse(object.created_at.to_s)
    return date.strftime('%a, %b %d, %Y')
  end
end
