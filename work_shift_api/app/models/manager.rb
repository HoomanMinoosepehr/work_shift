class Manager < ApplicationRecord
  has_secure_password
  before_save :capitalize
  belongs_to :company

  validates :email, uniqueness: true, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  validates :first_name, presence: true
  validates :last_name, presence: true
  # validates :password, length: { minimum: 8 }
  # validates_format_of :password, with: /\A(?=.*[A-Z])(?=.*[1-9])/, message: 'Password needs to have at least one number and one uppercase letter in its body.'


  def full_name
    "#{first_name} #{last_name}"
  end

  private

  def capitalize
      self.first_name = first_name.capitalize if first_name.present?
      self.last_name = last_name.capitalize if last_name.present?
  end

end
