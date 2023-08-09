class Manager < ApplicationRecord
  before_save :capitalize
  belongs_to :company

  def full_name
    "#{first_name} #{last_name}"
  end

  private

  def capitalize
      self.first_name = first_name.capitalize if first_name.present?
      self.last_name = last_name.capitalize if last_name.present?
  end
end
