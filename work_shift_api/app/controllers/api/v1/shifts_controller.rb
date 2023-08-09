class Api::V1::ShiftsController < ApplicationController

    def create
        @shift = Shift.new shift_params

        if @shift.save
            render json: { message: "Shift saved successfully.", status: 200 }
        else
            render json: { message: @shift.errors.messages, status: 422 }
        end

    end


    private

    def shift_params
        params.require(:shift).permit(
            :date,
            :start_time,
            :end_time
        )
    end

end
