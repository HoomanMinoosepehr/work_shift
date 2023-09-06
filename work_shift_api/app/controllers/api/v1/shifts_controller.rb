class Api::V1::ShiftsController < ApplicationController

    def create
        shift = Shift.new shift_params

        if shift.save
            render json: { message: "Shift saved successfully.", status: 200 }
        else
            render json: { message: shift.errors.messages, status: 422 }
        end
    end

    def index
        shifts = Shift.where(date: params[:date])
        p '====='
        p params[:date]
        # date = Shift.find 7
        # date.date.to_s
        p '------'
        p shifts
        render json: shifts, each_serializer: ShiftIndexSerializer
        # render json: { date: date.date.to_s, start: date.start_time.to_s, time: date.start_time }
    end

    def destroy
        shift = Shift.find params[:id]
        if shift.destroy
            render json: {status: 200}
        else
            render json: {status: shift.errors.full_messages}
        end
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
