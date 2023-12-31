class Api::V1::ShiftsController < ApplicationController

    # creating the assigned shift and adding it to the table
    def create
        shift = Shift.new shift_params
        shift.company_id = session[:company_id]
        shift.assigner = session[:full_name]

        if shift.save
            render json: { message: "Shift saved successfully.", status: 200 }
        else
            render json: { message: shift.errors.messages, status: 422 }
        end
    end

    # showing all the assigned shifts for all users based on an specific date
    def index
        company = Company.find session[:company_id]
        allShifts = company.shifts
        shifts = allShifts.where(date: params[:date])
        render json: shifts, each_serializer: ShiftIndexSerializer
    end


    def destroy
        shift = Shift.find params[:id]
        if shift.destroy
            render json: {status: 200}
        else
            render json: {status: shift.errors.full_messages}
        end
    end

    # showing the upcoming shifts for a specific user for the next 10 days
    def schedule
        today_date = Date.today
        end_date = today_date + 15.days
        employee = Employee.find session[:id]
        shifts = employee.shifts.where(date: today_date..end_date).order(:date)
        render json: shifts, each_serializer: ScheduleSerializer
    end


    private

    def shift_params
        params.require(:shift).permit(
            :date,
            :start_time,
            :end_time,
            :employee_id
        )
    end

end
