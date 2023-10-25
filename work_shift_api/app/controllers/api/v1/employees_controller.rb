class Api::V1::EmployeesController < ApplicationController

    before_action :authenticate_manager!, except: [:show, :update, :password]
    before_action :authenticate_account_employee!

    # add new amployee
    def create

        role = Role.new(email: params.require(:employee)[:email], user_type: 'employee')

        if role.save
            @employee = Employee.new employee_params
            company = company_get

            @employee[:company_id] = company.id

            if @employee.save
                render json: { message: "Employee added to your company.", status: 200 }
            else
                role.destroy
                render json: { message: @employee.errors.full_messages, status: 422 }
            end
        else
            render json: { message: role.errors.full_messages, status: 200 }
        end

    end
   
    # showing the list of all company's employees
    def index
        
        company = company_get
        
        employees = company.employees
        
        render json: employees
        
    end
    
    # showing an specific employee's info
    def show
        employee = Employee.find params[:id]

        if employee
            render json: employee
        else
            render json: { message: "Something went Wrong, Please try again!", status: 422 }
        end
    end

    # update amployee's info
    def update
        employee = Employee.find params[:id]

        if employee.update_columns(employee_params.to_h)
            render json: { message: 'Employee Updated successfully!', status: 200 }
        else
            render json: { message: 'Something went wrong!', status: 422 }
        end
    end

    # update employee's password
    def password
        employee = Employee.find params[:id]
        
        if employee.authenticate(params.require(:employee)[:old_password])
            if employee.update(password_params)    
                render json: {status: 200}
            else
                render json: {message: employee.errore.full_messages, status: 422}
            end
        else
            render json: {message: 'Wrong information!', status: 403}
        end
    end

    # delete amployee
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

    def password_params
        params.require(:employee).permit(
            :password,
            :password_confirmation
        )
    end
    
end
