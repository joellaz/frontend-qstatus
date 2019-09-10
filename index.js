var animalKingdom = {
  mammals: [
    {
      species: 'lion',
      mane: true,
      limbs: 4,
      tail: true
    },
    {
      species: 'human',
      mane: false,
      limbs: 4,
      tail: false
    }
  ]
};

var allMammals = animalKingdom.mammals;
var onlyLion = allMammals.filter(function (mammals) {
  if (mammals.species === 'lion') {
    return true;
  }
  return false;
});

console.log(onlyLion);
