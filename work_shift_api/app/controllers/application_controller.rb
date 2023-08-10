class ApplicationController < ActionController::API

    def authenticate_use!
        render json: { message: 'You need to sign in first!', status: 422 } unless user_logged_in?
    end


    def user_logged_in?
        @current_user.present?
    end

    def current_user

        return nil unless session[:id]

        @current_user ||= case session[:type]
                            when 'owner' then Company.find_by_id session[:id]
                            when 'manager' then Manager.find_by_id session[:id]
                            when 'employee' then Employee.find_by_id session[:id]
                            else nil
                            end

    end

end
