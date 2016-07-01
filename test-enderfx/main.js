var myCreep = require('creep');
var creepSpawner = require('creep_spawner');
var utils = require('utils');

module.exports.loop = function () {
    var spawn = Game.spawns.Spawn1,
        unitName, creep;

    if(!utils.hashLength(Game.creeps)){
        console.log('Creamos creep');
        unitName = creepSpawner.buildUnit(spawn, 'worker', 'harvester');
        console.log('Nuevo creep: ' + unitName);
    }

    for(var gameCreep in Game.creeps){
        creep = new MyCreep(Game.creeps[gameCreep]);
        creep.run();
    }
};