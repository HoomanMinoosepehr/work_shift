class Api::V1::AdminsController < ApplicationController

    # add new admin
    def create
        admin = Admin.find_by_user_name(params[:user_name])

        if admin && admin.authenticate(params[:password])
            render json: { message: 'Logged in successfully', status: 200 }
        else
            render json: { message: "Wrong information!", status: 403 }
        end
    end
    
end
