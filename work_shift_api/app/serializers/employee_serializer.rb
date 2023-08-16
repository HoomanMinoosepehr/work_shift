class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email
end
