class CreateManagers < ActiveRecord::Migration[7.0]
  def change
    create_table :managers do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end