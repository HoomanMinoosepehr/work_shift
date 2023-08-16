class Api::V1::SessionsController < ApplicationController

    def create
        type = params[:type]
        if type === 'owner'
            @user = Company.find_by_email params[:email]
        elsif type === 'manager'
            @user = Manager.find_by_email params[:email]
        elsif type === 'employee'
            @user = Employee.find_by_email params[:email]
        end

        if @user && @user.authenticate(params[:password])
            session[:id] = @user.id
            session[:full_name] = @user.full_name
            session[:type] = type.capitalize
            render json: { user: @user.full_name, message: "Successfully sigend in!", status: 200 }
        else
            render json: { message: 'Email or Password or selected role is wrong!', status: 422 }
        end

    end

    def destroy 
        session[:id] = nil
        session[:name] = nil
        session[:type] = nil
        render json: { message: 'Successfully logged out!', status: 200 }
    end

    def current
        render json: { id: session[:id], name: session[:full_name], type: session[:type] }
    end

end
