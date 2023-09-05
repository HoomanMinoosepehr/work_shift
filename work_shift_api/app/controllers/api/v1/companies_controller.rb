class Api::V1::CompaniesController < ApplicationController

    def create
        
        @company = Company.new company_params

        if @company.save
            render json: { company: @company, message: 'The company been created successfully!', status: 200 }
        else
            render json: { message: @company.errors.messages, status: 422 }
        end

    end

    def employees
        company = Company.find params[:id]

        render json: {employees: company.employees}
    end

    private

    def company_params
        params.require(:company).permit(
            :first_name,
            :last_name,
            :email,
            :password,
            :password_confirmation,
            :company_name
        )
    end

end
