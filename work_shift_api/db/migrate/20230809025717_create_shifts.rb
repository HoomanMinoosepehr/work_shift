class CreateShifts < ActiveRecord::Migration[7.0]
  def change
    create_table :shifts do |t|
      t.date :date
      t.time :start_time
      t.time :end_time
      t.references :employee, null: false, foreign_key: true
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
