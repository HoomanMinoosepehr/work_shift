class CreateRoles < ActiveRecord::Migration[7.0]
  def change
    create_table :roles do |t|
      t.text :email
      t.text :user_type

      t.timestamps
    end
  end
end
