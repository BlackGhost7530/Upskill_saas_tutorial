class PagesController < ApplicationController
    #Get Request to / (first page)
    def home
      @basic_plan = Plan.find(1)
      @pro_plan = Plan.find(2)
    end
    
    def about
    end
end 