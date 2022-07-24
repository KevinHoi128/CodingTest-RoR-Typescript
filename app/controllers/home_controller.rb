# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :set_todo_item, only: [:edit_todo_item]
  before_action :all_todo_order, only: [:landing, :reset_todo_items]

  def landing
  end

  def edit_todo_item
    @todo_item.update(todo_item_params)
    render json: @todo_item
  end

  def reset_todo_items
    Todo.update_all(checked: false)
    render json: @todos
  end

  private

  def todo_item_params
    params.require(:home).permit(:id, :checked)
  end

  def set_todo_item
    @todo_item = Todo.find(todo_item_params[:id])
  end

  def all_todo_order
    @todos = Todo.all.order(:id)
  end
end
