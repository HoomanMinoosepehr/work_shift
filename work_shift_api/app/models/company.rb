class Company < ApplicationRecord

    has_secure_password
    has_many :managers, dependent: :destroy
    has_many :employees, dependent: :destroy

end
