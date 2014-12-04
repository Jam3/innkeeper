module.exports = innkeeper;

var storeRedis = require( './lib/storeRedis' ),
	storeMemory = require( './lib/storeMemory' ),
	roomFactory = require( './lib/roomFactory' );

function innkeeper( settings ) {

	if( !( this instanceof innkeeper ) )
		return new innkeeper( settings );

	var s = settings || {};

	this.memory = s.redis ? storeRedis( s.redis ) : storeMemory();
}

innkeeper.prototype = {

	/**
	 * the reserve function will reserve a room. Reserve will return a promise which will
	 * return a room object on success.
	 * 
	 * @return {Promise} [description]
	 */
	reserve: function( socket ) {

		return roomFactory.reserve( socket.id, this.memory );
	},

	/**
	 * Using enter you can enter into a room. This method will return a promise
	 * which on succeed will return a room object. If the room does not exist the promise
	 * will fail.
	 * 
	 * @param  {String} id the id of a room you want to enter. Think of it as a room number.
	 * @return {Promise} a promise will be returned which on success will return a room object
	 */
	enter: function( socket, id ) {

		return roomFactory.enter( socket.id, this.memory, id );
	},

	/**
	 * Enter a room with a key instead of a roomid. Key's are shorter than roomid's
	 * so it is much nicer for a user on the frontend to enter with.
	 * 
	 * @param  {String} key a key which will be used to enter into a room.
	 * @return {Promise} a promise will be returned which on success will return a room object
	 */
	enterWithKey: function( socket, key ) {

		return roomFactory.enterWithKey( socket.id, this.memory, key );
	},

	/**
	 * Leave a room.
	 * 
	 * @param  {String} id the id of a room you want to leave. Think of it as a room number.
	 * @return {Promise} a promise will be returned which on success will return a room object if users are still in room null if not
	 */
	leave: function( socket, id ) {

		return roomFactory.leave( socket.id, this.memory, id );
	}
};