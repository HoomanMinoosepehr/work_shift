class Shift < ApplicationRecord
  belongs_to :employee

  validates :date, presence: true
  validates :date, uniqueness: { scope: :employee_id }
end
