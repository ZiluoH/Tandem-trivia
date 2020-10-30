fetch('data.json').then(function(response){
    return response.json()
}).then(function(obj){
    console.log(obj);
}).catch(function(error){
    console.error('Something went wrong with retrieving the data!')
    console.error(error)
})