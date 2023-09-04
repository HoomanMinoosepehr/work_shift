class Company < ApplicationRecord
    before_save :capitalize
    has_secure_password
    has_many :managers, dependent: :destroy
    has_many :employees, dependent: :destroy

    validates :email, uniqueness: true, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
    validates :first_name, presence: true
    validates :last_name, presence: true


    def full_name
        "#{first_name} #{last_name}"
    end
    
    private

    def capitalize
        self.first_name = first_name.capitalize if first_name.present?
        self.last_name = last_name.capitalize if last_name.present?
    end
end
