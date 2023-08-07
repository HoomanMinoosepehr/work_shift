class CreateCompanies < ActiveRecord::Migration[7.0]
  def change
    create_table :companies do |t|
      t.string :user_name
      t.string :email
      t.string :managers
      t.string :password_digest
      t.string :company_name

      t.timestamps
    end
  end
end