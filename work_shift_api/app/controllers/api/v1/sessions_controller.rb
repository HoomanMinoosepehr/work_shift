class Api::V1::SessionsController < ApplicationController

    def create

        # checking the user's role based on their email
        role = Role.find_by_email params[:email]
        
        if role
            # finding the user based on the email
            type = role.user_type
            if type === 'owner'
                @user = Company.find_by_email params[:email]
            elsif type === 'manager'
                @user = Manager.find_by_email params[:email]
            elsif type === 'employee'
                @user = Employee.find_by_email params[:email]
            end

            # check the email and make the session if it was correct
            if @user && @user.authenticate(params[:password])
                session[:id] = @user.id
                session[:full_name] = @user.full_name
                session[:type] = type.capitalize
                if type === 'owner'
                    session[:company_id] = @user.id
                else
                    session[:company_id] = @user.company.id
                end
                render json: { user: @user.full_name, message: "Successfully logged in!", status: 200 }
            else
                render json: { message: 'Email, Password or combination is wrong!', status: 422 }
            end

        else
            render json: { message: "User not found, check the Email", status: 422 }
        end


    end

    # action for logging out the user
    def destroy 

        session[:id] = nil
        session[:full_name] = nil
        session[:type] = nil
        session[:company_id] = nil
        render json: { message: 'Successfully logged out!', status: 200 }

    end

    # sending the logged in user's information
    def current

        render json: { id: session[:id], name: session[:full_name], type: session[:type], company_id: session[:company_id] }
        
    end

end
