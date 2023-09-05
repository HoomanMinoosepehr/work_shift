class ShiftIndexSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :employee, serializer: EmployeeShiftSerializer
end
