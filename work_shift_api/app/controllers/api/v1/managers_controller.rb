class Api::V1::ManagersController < ApplicationController

    def index
        owner = Company.find session[:id]
        manager = owner.managers
        render json: manager
    end

    def create
        
        manager = Manager.new manager_params
        company = Company.find session[:id]
        manager.company = company

        if manager.save
            render json: { message: "Manager added successfully!", status: 200 }
        else
            render json: { message: manager.errors.full_messages, status: 422 }
        end

    end

    def show
        manager = Manager.find params[:id]
        if manager
            render json: manager, serializer: ManagerShowSerializer
        else
            render json: { message: 'Something went wrong, please try again later.', status: 422 }
        end
    end

    def destroy
        manager = Manager.find params[:id]
        if manager.destroy
            render json: { message: "Manager deleted successfully", status: 200 }
        else
            render json: { message: 'Something went wrong, please try again later.', status: 422 }
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
