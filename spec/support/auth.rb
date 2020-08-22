class Home
  include Capybara::DSL
  def visit_homepage
   visit('/')
  end

  def visit_favourites
    visit('/favourites')
  end

  def sign_in
    visit('/')
    fill_in "Username",	with: "sharmarke"
  end
end
