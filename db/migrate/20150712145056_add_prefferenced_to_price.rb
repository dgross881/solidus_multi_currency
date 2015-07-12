class AddPrefferencedToPrice < ActiveRecord::Migration
  def change
    add_column :spree_prices, :preferences, :text 
  end
end
