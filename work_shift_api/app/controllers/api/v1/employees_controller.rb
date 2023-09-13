class Api::V1::EmployeesController < ApplicationController

    before_action :authenticate_manager!

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
    
    def show
        employee = Employee.find params[:id]

        if employee
            render json: employee
        else
            render json: { message: "Something went Wrong, Please try again!", status: 422 }
        end
    end

    def update
        employee = Employee.find params[:id]

        if employee.update_columns(employee_params.to_h)
            render json: { message: 'Employee Updated successfully!', status: 200 }
        else
            render json: { message: 'Something went wrong!', status: 422 }
        end
    end

    def destroy
        employee = Employee.find params[:id]

        if employee.destroy
            render json: { message: "Employee deleted", status: 200 }
        else
            render json: { message: "Something went wrong", status: 422 }
        end
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
