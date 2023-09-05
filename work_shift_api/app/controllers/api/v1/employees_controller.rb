class Api::V1::EmployeesController < ApplicationController

    def create

        @employee = Employee.new employee_params
        company = company_get

        @employee[:company_id] = company.id

        if @employee.save
            render json: { message: "Employee added to your company.", status: 200 }
        else
            render json: { message: @employee.errors.full_messages, status: 422 }
        end

    end

    def index

        company = company_get

        employees = company.employees

        render json: employees

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
