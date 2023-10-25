class Api::V1::CompaniesController < ApplicationController

    def create

        admin = Admin.find_by_user_name(params.require(:company)[:user_name])

        if admin && admin.authenticate(params.require(:company)[:admin_password])
            role = Role.new(email: params.require(:company)[:email], user_type: 'owner')
            
            if role.save
                @company = Company.new company_params
                if @company.save
                    render json: { company: @company, message: 'The company been created successfully!', status: 200 }
                else
                    role.destroy
                    render json: { message: @company.errors.full_messages, status: 422 }
                end
            else
                render json: { message: role.errors.full_messages, status: 422 }
            end
        else
            render json: { message: "Wrong information!", status: 403 }
        end

    end

    def show
        company = Company.find params[:id]

        if company
            render json: company, serializer: CompanySerializer
        else
            render json: { message: "Something went wrong!", status: 422 }
        end
    end

    def employees
        company = Company.find params[:id]

        render json: {employees: company.employees}
    end

    def update
        company = Company.find params[:id]

        if company.update_columns(company_params.to_h)
            render json: { status: 200 }
        else
            render json: { message: company.errors.full_messages, status: 422 }
        end
    end

    def password
        company = Company.find params[:id]
        
        if company.authenticate(params.require(:company)[:old_password])
            if company.update(password_params)    
                render json: {status: 200}
            else
                render json: {message: company.errore.full_messages, status: 422}
            end
        else
            render json: {message: 'Wrong information!', status: 403}
        end
    end

    private

    def company_params
        params.require(:company).permit(
            :first_name,
            :last_name,
            :email,
            :password,
            :password_confirmation,
            :company_name,
        )
    end

    def password_params
        params.require(:company).permit(
            :password,
            :password_confirmation
        )
    end

end
