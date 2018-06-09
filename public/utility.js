function caseFileToString(caseFile) {
  var {id, location, date, description} = caseFile;
  let {lat,lng} = location;
  return 'Case ID: ' + id + `<br>Location: ${lat}, ${lng}` + '<br>Date:' + date + '<br>Description: ' + description + '<br><br>';
}

function newCaseFile(id, location, category, date, description) {
  return {
    location: location,
    date: date,
    category: category, 
    id: id,
    description: description
  };
}

function filterCasesByLocation(position, cases) {
  function getDistanceInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  function proximity(coords1, coords2) { 
    return getDistanceInKm(coords1.lat, coords1.lng, coords2.lat, coords2.lng);
  }  

  let coords1 = {lat: position.coords.latitude, lng: position.coords.longitude};

  return cases.filter(function(caseFile) {
    let coords2 = caseFile.location;
    console.log(coords2);
    return proximity(coords1, coords2) < 10;
  });
}
