
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("cats").del()
    .then(function (){

       // Inserts seed entries
       knex("cats").insert([
        { cat_name: "SweetPotato", cat_age: 6 },
        { cat_name: "Cheddy", cat_age: 5 },
        { cat_name: "Binx", cat_age: 1 },
        { cat_name: "Scrub", cat_age: 2 },
    ]);
  })
}