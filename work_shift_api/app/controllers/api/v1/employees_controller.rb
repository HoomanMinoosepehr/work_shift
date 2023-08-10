class Api::V1::EmployeesController < ApplicationController

    def create

        @employee = Employee.new employee_params
        company_id = @current_user[:company_id]
        @employee[:company_id] = company_id

        if @employee.save
            render json: { message: "Employee added to your company.", status: 200 }
        else
            render json: { message: @employee.errors.messages, status: 422 }
        end

    end

    def index
        company = current_user.company
        render json: company
    end

    private

    def employee_params
        params.require(:employee).permit(
            :first_name,
            :last_name,
            :email,
            :password,
            :password_confirmation
        )
    end
    
end
