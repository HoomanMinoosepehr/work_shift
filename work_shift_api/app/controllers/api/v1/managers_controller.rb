class Api::V1::ManagersController < ApplicationController

    before_action :authenticate_owner!, except: [:show, :update, :password]
    before_action :authenticate_account_owner!

    # showing all the company's managers
    def index
        owner = Company.find session[:id]
        manager = owner.managers
        render json: manager
    end

    # function to create a new manager
    def create
        
        role = Role.new(email: params.require(:manager)[:email], user_type: 'manager')

        if role.save
            manager = Manager.new manager_params
            company = Company.find session[:id]
            manager.company = company

            if manager.save
                render json: { message: "Manager added successfully!", status: 200 }
            else
                role.destroy
                render json: { message: manager.errors.full_messages, status: 422 }
            end
        else
            render json: { message: role.errors.full_messages, status: 422 }
        end

    end

    # function for shwing the specific manager's info
    def show
        manager = Manager.find params[:id]
        if manager
            render json: manager, serializer: ManagerShowSerializer
        else
            render json: { message: 'Something went wrong, please try again later.', status: 422 }
        end
    end

    # update manager
    def update
        manager = Manager.find params[:id]

        if manager.update_columns(manager_params.to_h)
            render json: { status: 200 }
        else
            render json: { message: manager.errors.full_messages, status: 422 }
        end
    end

    # update manager's password
    def password
        manager = Manager.find params[:id]
        
        if manager.authenticate(params.require(:manager)[:old_password])
            if manager.update(password_params)    
                render json: {status: 200}
            else
                render json: {message: manager.errore.full_messages, status: 422}
            end
        else
            render json: {message: 'Wrong information!', status: 403}
        end
    end

    # delete specific manager
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

    def password_params
        params.require(:manager).permit(
            :password,
            :password_confirmation
        )
    end

end
