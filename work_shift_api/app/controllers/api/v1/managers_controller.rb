class Api::V1::ManagersController < ApplicationController

    def create
        
        @manager = Manager.new manager_params

        if @manager.save
            render json: { message: "Manager added successfully!", status: 200 }
        else
            render json: { message: @manager.errors.messages, status: 422 }
        end

    end

    private

    def manager_params
        params.require(:manager).permit(
            :first_name,
            :last_name,
            :email,
            :password,
            :password_confirmation
        )
    end

end
