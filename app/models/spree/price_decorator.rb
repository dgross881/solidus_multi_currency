Spree::Price.class_eval do 
 preference :auto_update, :boolean, :default => false 

  before_save :set_price_from_base_currency
  after_save :update_other_currencies

  def base_price?
    self == variant.default_price
  end  
  
  private
  
  def update_other_currencies
   if base_price?
    self.preferred_auto_update = false
    variant.prices.select(&:prefers_auto_update?).map(&:save)
   end 
  end
  
  def set_price_from_base_currency
   if preferred_auto_update?
     base_price = variant.default_price
     base_money = ::Money.new(base_price.money.cents, base_price.currency)
     self.price = base_money.exchange_to(self.currency)
   end 
  end
end
