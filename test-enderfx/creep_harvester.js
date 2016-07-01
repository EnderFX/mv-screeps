var creepHarvester = {
	modes: [
		'moveHarvest',
		'staticHarvest'
	],

	runMoveHarvest: function(){
		var me = this;
		me.creep.say('Run Move');
	},

	runStaticHarvest: function(){
		var me = this;
		me.creep.say('Run Static');
	}
};

module.exports = creepHarvester;