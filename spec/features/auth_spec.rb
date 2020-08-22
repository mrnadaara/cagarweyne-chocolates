require 'rails_helper'
require 'support/auth'

feature "Visit sign in" do
  let(:home) {Home.new}
  scenario "Able to see welcome text", :js => true do
   home.visit_homepage
   expect(page).to have_content("Sign In")
  end

  scenario "redirect back to sign when accessing other pages", :js => true do
    home.visit_favourites
    expect(page).to have_content("Sign In")
  end

  scenario "redirect to home when signed in successfully", :js => true do
    home.sign_in
    expect(page).to have_content("Chocolates")
  end
end
