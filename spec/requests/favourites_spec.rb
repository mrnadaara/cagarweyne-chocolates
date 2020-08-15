require 'rails_helper'

RSpec.describe 'Favourites API', type: :request do
  before(:context) do
    # rubocop:disable Metrics/LineLength
    Chocolate.create(name: 'Mars', description: "Mars is a variety of chocolate bar produced by Mars, Incorporated. It was first manufactured in 1932 in Slough, England by Forrest Mars, Sr. The bar was sold in two different formulations. In its original British version the bar consists of caramel and nougat coated with milk chocolate, developed to resemble the American chocolate bar known as the Milky Way, which had been introduced a decade earlier. An American version of the Mars Bar was produced which had nougat and toasted almonds covered in milk chocolate; later, caramel was added to the recipe as well. The American version was discontinued in 2002, and then revived the following year under the name 'Snickers Almond'.", image: 'mars_choc')
    Chocolate.create(name: 'Ferrero Rocher', description: "Ferrero Rocher is a chocolate and hazelnut confectionery produced by the Italian chocolatier Ferrero. The Ferrero Rocher was introduced in 1982 in Europe. Shortly after release, production was halted due to a problem with label printing. Michele Ferrero, the credited inventor, named the chocolate after a grotto in the Roman Catholic shrine of Lourdes, Rocher de Massabielle. Rocher comes from French and means rock or boulder. The chocolate consists of a whole roasted hazelnut encased in a thin wafer shell filled with hazelnut chocolate and covered in milk chocolate and chopped hazelnuts. Its ingredients are milk chocolate, sugar, cocoa butter, cocoa mass, skim milk powder, butteroil, lecithin as emulsifier (soy), vanillin (artificial flavor), hazelnuts, palm oil, wheat flour, whey (milk), lowfat cocoa powder, sodium bicarbonate (leavening agent), and salt.", image: 'rocher_choc')
    Chocolate.create(name: 'Twix', description: "Twix is a chocolate bar made by Mars, Inc., consisting of a biscuit applied with other confectionery toppings and coatings (most frequently caramel and milk chocolate). Twix are packaged with two or four bars in a wrapper, the new slogan for Twix is 'Chew It Over With Twix.' Miniature and other variations of Twix bars are also available. The product was first produced in the United Kingdom in 1967, and introduced in the United States in 1979. Twix was called Raider in mainland Europe for many years before its name was changed in 1991 (2000 in Denmark, Finland, Norway, Sweden and Turkey) to match the international brand name. The name Twix is a portmanteau derived from 'twin sticks'.", image: 'twix_choc')
    Chocolate.create(name: 'Cadbury', description: "Cadbury, formerly Cadbury's and Cadbury Schweppes, is a British multinational confectionery company wholly owned by Mondelez International (originally Kraft Foods) since 2010. It is the second largest confectionery brand in the world after Mars. Cadbury is internationally headquartered in Uxbridge, west London, and operates in more than 50 countries worldwide. It is known for its Dairy Milk chocolate, the Creme Egg and Roses selection box, and many other confectionery products. One of the best-known British brands, in 2013 The Daily Telegraph named Cadbury among Britain's most successful exports.", image: 'cadbury_choc')
    Chocolate.create(name: 'Ghirardelli', description: "The Ghirardelli Chocolate Company is a United States division of Swiss confectioner Lindt & Sprüngli. The company was founded by and is named after Italian chocolatier Domenico Ghirardelli, who, after working in South America, moved to California. The Ghirardelli Chocolate Company was incorporated in 1852, and is the third-oldest chocolate company in the United States, after Baker's Chocolate and Whitman's. Ghirardelli chocolates deliver the perfect balance of intense, slow-melting Ghirardelli chocolate and luscious fillings. These individually wrapped chocolates are perfect as an individual indulgence, to share with friends and family, or to give as a gift.", image: 'ghirardelli_choc')
    Chocolate.create(name: 'Snickers', description: "In 1930, Mars introduced Snickers, named after the favourite horse of the Mars family. The Snickers chocolate bar consists of nougat, peanuts, and caramel with a chocolate coating. The bar was marketed under the name 'Marathon' in the UK and Ireland until 1990, when Mars decided to align the UK product with the global Snickers name (Mars had marketed and discontinued an unrelated bar named Marathon in the United States during the 1970s which was similar to the UK's Curly Wurly). There are also several other Snickers products such as Snickers mini, dark chocolate, ice cream bars, Snickers with almonds, Snickers with hazelnuts, Snickers with pecans, Snickers peanut butter bars, Snickers protein and Snickers with Extra Caramel, as well as espresso, fiery, and sweet & salty versions.", image: 'snickers_choc')
    Chocolate.create(name: 'Kit Kat', description: "Kit Kat is a chocolate-covered wafer bar confection created by Rowntree's of York, United Kingdom, and is now produced globally by Nestlé, which acquired Rowntree in 1988, with the exception of the United States, where it is made under license by the H. B. Reese Candy Company, a division of The Hershey Company. The standard bars consist of two or four pieces composed of three layers of wafer, separated and covered by an outer layer of chocolate. Each finger can be snapped from the bar separately. There are many different flavours of Kit Kat, including milk, white, and dark chocolate.", image: 'kit-kat_choc')
    # rubocop:enable Metrics/LineLength
    @user = create(:user)
    @fav_choc = Chocolate.first
    @user.favourite_chocolates << @fav_choc
  end

  describe 'POST /favourites' do
    before {
      post '/v1/favourites', params: { favourite: { user: @user.id }}
    }
    it 'returns user favourites' do
      parsed_body = JSON.parse(response.body)
      expect(response.body).not_to be_empty
      expect(parsed_body.size).to eq(1)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /favourites' do
    before {
      user = create(:user)
      post '/v1/favourites', params: { favourite: { user: user.id }}
    }
    it 'returns empty favourites' do
      parsed_body = JSON.parse(response.body)
      expect(response.body).not_to be_empty
      expect(parsed_body.size).to eq(0)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /favourites' do
    before {
      post '/v1/favourites/is-favourited', params: { favourite: { user: @user.id, chocolate: @fav_choc.id }}
    }
    it 'check if choc is favourited by user' do
      parsed_body = JSON.parse(response.body)
      expect(response.body).not_to be_empty
      expect(parsed_body['isFavourited']).to eq(true)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /toggle-fav' do
    before {
      post '/v1/favourites/toggle-fav', params: { favourite: { user: @user.id, chocolate: @fav_choc.id }}
    }
    it 'favourite/unfavourite chocolate' do
      expect(@user.favourite_chocolates.count).to eq(0)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end
