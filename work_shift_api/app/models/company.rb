class Company < ApplicationRecord
    before_save :capitalize
    has_secure_password
    has_many :managers, dependent: :destroy
    has_many :employees, dependent: :destroy

    def capitalize
        self.company_name = company_name.capitalize if company_name.present?
    end

end
