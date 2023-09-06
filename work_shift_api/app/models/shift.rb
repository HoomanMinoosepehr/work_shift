class Shift < ApplicationRecord
  belongs_to :employee

  validates :date, uniqueness: {scope: :employee_id}
end
