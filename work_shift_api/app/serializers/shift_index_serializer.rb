class ShiftIndexSerializer < ActiveModel::Serializer
  attributes :id, :formatted_start, :formatted_end, :formatted_date
  belongs_to :employee, serializer: EmployeeShiftSerializer

  def formatted_date
    # object.date.strftime('%d/%m/%y')
    # date = object.date.strftime("%Y-%m-%d")
    return Date.parse(object.date.to_s)
  end
  
  def formatted_start
    object.start_time.strftime('%I:%M %p')
  end

  def formatted_end
    object.end_time.strftime('%I:%M %p')
  end
end
