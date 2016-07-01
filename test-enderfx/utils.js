var utils = {
	hashLength: function(hash){
		var i = 0;
		for(var k in hash){
			i++;
		}
		return i;
	}
};

module.exports = utils;