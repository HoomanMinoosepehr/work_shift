class ApplicationController < ActionController::API
    
    # checking wether the user logged in or not
    def authenticate_user!
        render json: { message: 'You need to sign in first!', status: 403 } unless user_logged_in?
    end

    # showing error if the user is not owner
    def authenticate_owner!
        render json: { message: "Only Owner has access to this page!", status: 403 } unless owner_logged_in?
    end

    # showing error if the user is not manager
    def authenticate_manager!
        render json: { message: "Only Managers or the Owner have access to this page!", status: 403 } unless manager_logged_in?
    end

    # checking wether the logged in user is owner or not
    def owner_logged_in?
        session[:type] === 'Owner' ? true : false
    end

    # checking wether the logged in user is a manager or not
    def manager_logged_in?
        session[:type] === 'Manager' || session[:type] === 'Owner' ? true : false
    end

    def authenticate_account_owner!
        if session[:type]
            session[:id] === params[:id] ? true : false
        end
    end

    # chek wether the request is comming from a manager or owner or not
    def authenticate_account_employee!
        session[:type] === 'Manager' || session[:type] === 'Owner' || session[:id] === params[:id] ? true : false
    end

    def user_logged_in?
        @current_user.present?
    end

    # querying the logged in user's role
    def current_user

        return nil unless session[:id]

        @current_user ||= case session[:type]
                            when 'owner' then Company.find_by_id session[:id]
                            when 'manager' then Manager.find_by_id session[:id]
                            when 'employee' then Employee.find_by_id session[:id]
                            else nil
                           end

    end

    # finding the logged in user's company's name
    def company_get
        case session[:type]
        when 'Owner'
            return Company.find session[:id]
        when "Manager"
            manager = Manager.find session[:id]
            return manager.company
        end
    end

end
