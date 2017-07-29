class CreateContacts < ActiveRecord::Migration[5.0]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.text :comments
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
    end
  end
end
