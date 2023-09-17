class Admin < ApplicationRecord
    has_secure_password

    validates :user_name, length: { minimum: 8 }
    validates :password, length: { minimum: 8 }
    validates_format_of :password, with: /\A(?=.*[A-Z])(?=.*[1-9])/, message: 'Password needs to have at least one number and one uppercase letter in its body.'
end
