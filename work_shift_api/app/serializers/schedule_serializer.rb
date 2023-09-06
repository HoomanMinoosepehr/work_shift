class ScheduleSerializer < ActiveModel::Serializer
  attributes :formatted_date, :formatted_start, :formatted_end

  def formatted_date
    Date.parse(object.date.to_s)
  end

  def formatted_start
    object.start_time.strftime('%I:%M %p')
  end

  def formatted_end
    object.end_time.strftime('%I:%M %p')
  end

end
