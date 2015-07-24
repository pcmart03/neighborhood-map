var model = {
  keyPlaces: [
  {
    name: "Jaleo",
    streetAddress: "2250 Crystal Drive",
    keywords: ['tapas','restaurant','spanish','date night','wine'],
    lat: 38.853636,
    lng: -77.049553,
  },
  {
    name: "Extreme Pizza",
    streetAddress: "1419 S Fern St",
    keywords: ["pizza","beer"],
    lat: 38.860028,
    lng: -77.056056,
  },
  {
    name: "RedRocks Arlington",
    streetAddress: "901 S Barton St",
    keywords: ["pizza","beer","brunch"],
    lat: 38.864033,
    lng: -77.084282,
  },
  {
    name: "Giant",
    streetAddress: "3450 Washington Blvd",
    keywords: ["grocery store", "pharmacy"],
    lat: 38.885886,
    lng: -77.103031,
  }
],
  getPlaces: function(){
    return model.keyPlaces;
  }
};
