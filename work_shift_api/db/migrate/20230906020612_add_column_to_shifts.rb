class AddColumnToShifts < ActiveRecord::Migration[7.0]
  def change
    add_column :shifts, :assigner, :text
  end
end
