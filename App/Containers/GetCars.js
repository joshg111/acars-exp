var AWS = require('aws-sdk');


function get_cars(params) {
  console.log("get_cars params = ", params);
  return new Promise(function(resolve, reject) {
    // AWS.config.loadFromPath('./aws-config.json');
    AWS.config.update({accessKeyId: "abc",
                      secretAccessKey: "123",
                      region: "us-west-1"});

    var lambda = new AWS.Lambda();
    // create JSON object for parameters for invoking Lambda function
    var pullParams = {
      FunctionName : 'craigslist-kbb-dev-hello',
      InvocationType : 'RequestResponse',
      LogType : 'None',
      Payload : JSON.stringify(params)
    };

    lambda.invoke(pullParams, function(error, data) {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    });
  });
}

export default get_cars;
