var creepSpawner = {

	creepPatterns: {
		'test': [TOUGH],
		'worker' : [WORK, CARRY, MOVE],
		'workerII' : [WORK, WORK, CARRY, MOVE, MOVE],
		'workerIII': [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
		'longWorker': [WORK, CARRY, CARRY, MOVE, MOVE],
		'longWorkerII': [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
		'soldier': [ATTACK, MOVE],
		'soldierII': [ATTACK, ATTACK, MOVE, MOVE],
		'soldierIII': [ATTACK, ATTACK, ATTACK, MOVE, MOVE],
		'medic': [HEAL, MOVE],
		'medicII': [HEAL, HEAL, MOVE],
		'medicIII': [HEAL, HEAL, HEAL, MOVE, MOVE],
		'ranger': [RANGED_ATTACK, MOVE],
		'rangerII': [RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE],
		'rangerIII': [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE],
		'claimer': [CLAIM, MOVE],
		'claimerII': [CLAIM, CLAIM, MOVE]
	},

	modifierFn: {
		TOUGH: function(partCount){
			return Array(partCount).fill(TOUGH);
		},
		WORK: function(partCount){
			return Array(partCount).fill(WORK);
		},
		CARRY: function(partCount){
			return Array(partCount).fill(CARRY);
		},
		MOVE: function(partCount){
			return Array(partCount).fill(MOVE);
		},
		ATTACK: function(partCount){
			return Array(partCount).fill(ATTACK);
		},
		RANGED_ATTACK: function(partCount){
			return Array(partCount).fill(RANGED_ATTACK);
		},
		HEAL: function(partCount){
			return Array(partCount).fill(HEAL);
		},
		CLAIM: function(partCount){
			return Array(partCount).fill(CLAIM);
		}
	},

	// Possible calls:
	// buildUnit('soldierII', 2);
	// buildUnit({
	// 	pattern: 'soldierII',
	// 	level: 2,
	// 	modifiers: {
	// 		TOUGH: 5
	// 	}
	// });
	buildUnit: function(spawn, config, level){
		var me = this,
			unitName,
			unitParts = [];

		if(typeof(config) == 'string'){
			unitParts = me.repeatPattern(me.creepPatterns[config] || [], level || 1);
		}else{
			unitParts = config.pattern ? me.repeatPattern(me.creepPatterns[config.pattern] || [], config.level || 1) : [];
			// Check modifiers
			if(config.modifiers){
				for(var modifierName in config.modifiers){
					unitParts = unitParts.concat(me.modifierFn[modifierName](config.modifiers[modifierName]));
				}
			}
		}

		unitName = spawn.createCreep(unitParts);

		return unitName;
	},

	repeatPattern: function(pattern, level){
		var i,j,
			result = [];

		// Trying to avoid costly operations like each to save CPU.
		for(i = 0; i < pattern.length; i++){
			for(j = 0; j < level; j++){
				result.push(pattern[i]);
			}
		}

		return result;
	},

    run: function() {

	}
};

module.exports = creepSpawner;