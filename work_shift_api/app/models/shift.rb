class Shift < ApplicationRecord
  belongs_to :employee
  belongs_to :company

  validates :date, presence: true
  validates :date, uniqueness: { scope: :employee_id }
end
