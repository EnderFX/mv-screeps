function creep(crp){
	var me = this;
	me.creep = crp;
	me.modeFn = null;
}

creep.prototype.run = function(){
	var me = this,
		creepModule,
		role = me.getMemory('role'),
		mode = me.getMemory('mode');

	if(!role){
		console.log('Uh, no tenemos rol');
	}else{
		creepModule = require('creep_' + role);
		me.become(creepModule);
	}

	if(!me.setMode(mode)){
		console.log('Error: creepHarvester setup with invalid mode ' + mode);
	}else{
		me.modeFn();
	}
};

creep.prototype.getMemory = function(name){
	var me = this;
	if(me.creep){
		return me.creep.memory[name];
	}else{
		console.log('CRP: Get memory called without creep instance.');
	}
};

creep.prototype.setMode = function(mode){
	var me = this,
		modeFn;

	if(me.modes.indexOf(mode) >= 0){
		modeFn = me['run' + mode];
		if(modeFn){
			me.modeFn = modeFn;
			return true;
		}
	}

	if(me.creep){
		me.creep.say('*Fn!Found');
	}

	return false;
};

creep.prototype.become = function(target){
	var me = this;
	for(var n in target) {
		me[n] = target[n];
	}
};

module.exports = creep;