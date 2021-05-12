const tableNames = require('../../src/constants/tableNames');

exports.seed = async (knex) => {
  let category = null;
  // Deletes ALL existing entries
  await knex(tableNames.CheckableKeywordsCategories.mydBName).del();
  await knex(tableNames.CheckableKeywordsCategories.mydBName).insert([
    { name: 'Companies'.toLowerCase() },
    { name: 'Brands'.toLowerCase() },
    { name: 'Raw materials'.toLowerCase() },
    { name: 'Ingredients'.toLowerCase() },
    { name: 'Process and materials'.toLowerCase() },
    { name: 'Textures'.toLowerCase() },
    { name: 'Organoleptic'.toLowerCase() },
    { name: 'Trends'.toLowerCase() },
  ]);

  await knex(tableNames.CheckableKeywords.mydBName).del();
  category = await knex(tableNames.CheckableKeywordsCategories.mydBName)
    .select('id').where('name', 'Companies'.toLowerCase()).first();
  await knex(tableNames.CheckableKeywords.mydBName).insert([
    { keyword: 'Thaï Union'.toLowerCase(), Category_id: category.id },
    { keyword: 'MW Brands'.toLowerCase(), Category_id: category.id },
    { keyword: 'Paul Paulet'.toLowerCase(), Category_id: category.id },
    { keyword: 'Wenceslas Chancerelle'.toLowerCase(), Category_id: category.id },
    { keyword: 'Trident Seafood'.toLowerCase(), Category_id: category.id },
    { keyword: 'Dongwong'.toLowerCase(), Category_id: category.id },
    { keyword: 'Starkist'.toLowerCase(), Category_id: category.id },
    { keyword: 'Bumble Bee'.toLowerCase(), Category_id: category.id },
    { keyword: 'Proteus'.toLowerCase(), Category_id: category.id },
    { keyword: 'Calvo'.toLowerCase(), Category_id: category.id },
    { keyword: 'Capitaine Cook'.toLowerCase(), Category_id: category.id },
    { keyword: 'Capitaine Houat'.toLowerCase(), Category_id: category.id },
    { keyword: 'Armoric'.toLowerCase(), Category_id: category.id },
    { keyword: 'Cobreco'.toLowerCase(), Category_id: category.id },
    { keyword: 'Barilla'.toLowerCase(), Category_id: category.id },
    { keyword: 'Findus'.toLowerCase(), Category_id: category.id },
    { keyword: 'Bonduelle'.toLowerCase(), Category_id: category.id },
  ]);
  category = await knex(tableNames.CheckableKeywordsCategories.mydBName)
    .select('id').where('name', 'Brands'.toLowerCase()).first();
  await knex(tableNames.CheckableKeywords.mydBName).insert([
    { keyword: 'Parmentier'.toLowerCase(), Category_id: category.id },
    { keyword: 'Petit Navire'.toLowerCase(), Category_id: category.id },
    { keyword: 'John West'.toLowerCase(), Category_id: category.id },
    { keyword: 'Mareblu'.toLowerCase(), Category_id: category.id },
    { keyword: 'Connétable'.toLowerCase(), Category_id: category.id },
    { keyword: 'Le Savoureux'.toLowerCase(), Category_id: category.id },
    { keyword: 'Princes'.toLowerCase(), Category_id: category.id },
    { keyword: 'Mouettes d\'Arvor'.toLowerCase(), Category_id: category.id },
    { keyword: 'Arok'.toLowerCase(), Category_id: category.id },
  ]);
  category = await knex(tableNames.CheckableKeywordsCategories.mydBName)
    .select('id').where('name', 'Raw materials'.toLowerCase()).first();
  await knex(tableNames.CheckableKeywords.mydBName).insert([
    { keyword: 'Tuna'.toLowerCase(), Category_id: category.id },
    { keyword: 'Mackerel'.toLowerCase(), Category_id: category.id },
    { keyword: 'Sardine'.toLowerCase(), Category_id: category.id },
    { keyword: 'Salmon'.toLowerCase(), Category_id: category.id },
    { keyword: 'Fish'.toLowerCase(), Category_id: category.id },
    { keyword: 'Seabass'.toLowerCase(), Category_id: category.id },
    { keyword: 'Seabream'.toLowerCase(), Category_id: category.id },
    { keyword: 'Herring'.toLowerCase(), Category_id: category.id },
    { keyword: 'Meat'.toLowerCase(), Category_id: category.id },
    { keyword: 'Chicken'.toLowerCase(), Category_id: category.id },
  ]);
  category = await knex(tableNames.CheckableKeywordsCategories.mydBName)
    .select('id').where('name', 'Ingredients'.toLowerCase()).first();
  await knex(tableNames.CheckableKeywords.mydBName).insert([
    { keyword: 'Salt'.toLowerCase(), Category_id: category.id },
    { keyword: 'Carrageenans'.toLowerCase(), Category_id: category.id },
    { keyword: 'Rosemary'.toLowerCase(), Category_id: category.id },
    { keyword: 'Tuna protein'.toLowerCase(), Category_id: category.id },
    { keyword: 'Fish protein'.toLowerCase(), Category_id: category.id },
    { keyword: 'Protein hydrolyzates fish'.toLowerCase(), Category_id: category.id },
    { keyword: 'Fat'.toLowerCase(), Category_id: category.id },
    { keyword: 'Trans Fat'.toLowerCase(), Category_id: category.id },
    { keyword: 'Omega 3'.toLowerCase(), Category_id: category.id },
    { keyword: 'Antioxidants'.toLowerCase(), Category_id: category.id },
    { keyword: 'Vegan protein'.toLowerCase(), Category_id: category.id },
    { keyword: 'Legumes'.toLowerCase(), Category_id: category.id },
    { keyword: 'Curcuma'.toLowerCase(), Category_id: category.id },
    { keyword: 'New healthy Oils'.toLowerCase(), Category_id: category.id },
    { keyword: 'Seads'.toLowerCase(), Category_id: category.id },
    { keyword: 'New natural flavors'.toLowerCase(), Category_id: category.id },
  ]);
  category = await knex(tableNames.CheckableKeywordsCategories.mydBName)
    .select('id').where('name', 'Process and materials'.toLowerCase()).first();
  await knex(tableNames.CheckableKeywords.mydBName).insert([
    { keyword: 'Injection'.toLowerCase(), Category_id: category.id },
    { keyword: 'Brine'.toLowerCase(), Category_id: category.id },
    { keyword: 'Grilled'.toLowerCase(), Category_id: category.id },
    { keyword: 'Injection protein'.toLowerCase(), Category_id: category.id },
    { keyword: 'Injection fish'.toLowerCase(), Category_id: category.id },
    { keyword: 'Injection fish process'.toLowerCase(), Category_id: category.id },
    { keyword: 'Injection tuna process'.toLowerCase(), Category_id: category.id },
    { keyword: 'Injection mackerel process'.toLowerCase(), Category_id: category.id },
    { keyword: 'Injection sardine process'.toLowerCase(), Category_id: category.id },
    { keyword: 'Improvement yield fish'.toLowerCase(), Category_id: category.id },
    { keyword: 'Improving water holding capacity'.toLowerCase(), Category_id: category.id },
    { keyword: 'Cleaning fish'.toLowerCase(), Category_id: category.id },
    { keyword: 'Retorting'.toLowerCase(), Category_id: category.id },
    { keyword: 'HPHT'.toLowerCase(), Category_id: category.id },
    { keyword: 'Microwaves'.toLowerCase(), Category_id: category.id },
    { keyword: 'Ultrasounds'.toLowerCase(), Category_id: category.id },
    { keyword: 'Elimination salt in meat'.toLowerCase(), Category_id: category.id },
    { keyword: 'Elimination Hg in fish'.toLowerCase(), Category_id: category.id },
    { keyword: 'The link betwween Hg and Selenium'.toLowerCase(), Category_id: category.id },
    { keyword: 'Descmposition nutrients by retorting'.toLowerCase(), Category_id: category.id },
    { keyword: 'Robotization'.toLowerCase(), Category_id: category.id },
    { keyword: 'Bioplastics'.toLowerCase(), Category_id: category.id },
  ]);
  category = await knex(tableNames.CheckableKeywordsCategories.mydBName)
    .select('id').where('name', 'Textures'.toLowerCase()).first();
  await knex(tableNames.CheckableKeywords.mydBName).insert([
    { keyword: 'Texture'.toLowerCase(), Category_id: category.id },
    { keyword: 'System measurements'.toLowerCase(), Category_id: category.id },
    { keyword: 'Softness x no drain'.toLowerCase(), Category_id: category.id },
  ]);
  category = await knex(tableNames.CheckableKeywordsCategories.mydBName)
    .select('id').where('name', 'Organoleptic'.toLowerCase()).first();
  await knex(tableNames.CheckableKeywords.mydBName).insert([
    { keyword: 'Volatile compounds'.toLowerCase(), Category_id: category.id },
    { keyword: 'Sensorial comparatives'.toLowerCase(), Category_id: category.id },
  ]);
  category = await knex(tableNames.CheckableKeywordsCategories.mydBName)
    .select('id').where('name', 'Trends'.toLowerCase()).first();
  await knex(tableNames.CheckableKeywords.mydBName).insert([
    { keyword: 'Vegan'.toLowerCase(), Category_id: category.id },
    { keyword: 'Protein'.toLowerCase(), Category_id: category.id },
    { keyword: 'Low in Carbs'.toLowerCase(), Category_id: category.id },
    { keyword: 'No Waste'.toLowerCase(), Category_id: category.id },
    { keyword: 'Personalised Diet'.toLowerCase(), Category_id: category.id },
  ]);
};
