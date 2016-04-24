/**
  *	TODO:
  * Fix the pause/start function, whenever you pause in the break, it starts from timer
  */

(function()
{
	// elems
	var mins_container = document.querySelector(".mins"),
		secs_container = document.querySelector(".secs"),
		state = document.querySelector(".state"),
		cycles_container = document.querySelector(".cycles");

	var timer_time = document.querySelector(".timer_time"),
		break_time = document.querySelector(".break_time");

	// bindings
	window.addEventListener("keydown", keydownHandler, false);

	// sound
	var alarm = new Audio("audio/horn.mp3");

	// Global vars
	var interval,
		cycles = 1,
		timer_running = false;

	// checks whether its work || break time.
	// 1 === work && 0 === break | by default set to work
	var running = 1;

	var msg_work = "Work time... Try Hard...",
		msg_break = "Relax... Enjoy the moment";


	var Clock = function(mins, def)
	{
		this.mins = mins;
		this.secs = 0;
		this.mins_def = def;
	};


	Clock.prototype.init = 	function()
	{
		this.mins = this.mins_def;
		this.secs = 0;
	};

	Clock.prototype.draw = function()
	{
		mins_container.innerHTML = pad_two(this.mins);
		secs_container.innerHTML = pad_two(this.secs);
	}

	Clock.prototype.start = function(msg)
	{
		var self = this;
		this.draw();

		timer_running = true;
		state.innerHTML = msg;

		interval = setInterval( function() { timer(self); }, 1000);
	};

	Clock.prototype.pause = function () {
		if (running === 1)
		{
			timer_running = false;
			state.innerHTML = "PAUSED!!!";
			clearInterval(interval);
		}
		else
			return;
	};

	Clock.prototype.inc = function () {
		if (!timer_running && this.mins < 99)
		{
			++this.mins_def;
			this.mins = this.mins_def;

			update_state();
			update_screen(mins_container, _timer.mins_def);
		}
	};

	Clock.prototype.dec = function () {
		if (!timer_running && this.mins > 1)
		{
			--this.mins_def;
			this.mins = this.mins_def;

			update_state();
			update_screen(mins_container, _timer.mins_def);
		}
	};


	var _timer = new Clock(25, 25), // mins, default_mins
		_break = new Clock(5, 5); 	// mins, default_mins

	// initial setup
	cycles_container.innerHTML = pad_two(cycles);
	state.innerHTML = "&nbsp;";
	_timer.init();
	_timer.draw();

	update_state();

	// Fucntions _-_-_-_-
	function timer(obj)
	{
		if (obj.secs === 0)
		{
			if (obj.mins === 0)
			{
				stop();
				alarm.play();
				switch_segment();
				return;
			}
			else
			{
				obj.secs = 59;
				--obj.mins;
			}

		}
		else
			--obj.secs;

		obj.draw();
	} // timer

	function reset()
	{
		cycles = 1;
		running = 1;
		timer_running = false;
		state.innerHTML = "&nbsp;";
		clearInterval(interval);

		_timer.init();
		_break.init();

		// draw work_time on screen
		_timer.draw();

		update_state();
	} // reset

	function stop()
	{
		clearInterval(interval);
		_timer.init();
		_break.init();
	} // stop

	// change the timer to work || break time
	function switch_segment()
	{
		if (running === 1)
			switch_to_break();
		else
			switch_to_work();
	}

	function switch_to_break()
	{
		update_screen(mins_container, _break.mins_def);
		running = 0;
		_break.start(msg_break);
	}

	function switch_to_work()
	{
		update_screen(mins_container, _timer.mins_def);

		++cycles;
		running = 1;
		_timer.start(msg_work);

		// cycles has been changed, so update the state section
		update_state();
	}


	// update screen on changes in data
	function update_state()
	{
	    timer_time.innerHTML = pad_two(_timer.mins_def);
	    break_time.innerHTML = pad_two(_break.mins_def);
		cycles_container.innerHTML = pad_two(cycles);
	}

	function update_screen(container, val)
	{
		container.innerHTML = pad_two(val);
	}


	// pad a value with a leading zero
	function pad_two(val)
	{
		return val <= 9 ? "0" + val: val;
	}


	// Execute function associated with particular key
	function keydownHandler(event)
	{
		// 32 === Space Bar
		if(event.keyCode === 32)
		{
			if (timer_running)
				_timer.pause();
			else
				_timer.start(msg_work);
		}

		// 13 === Enter Key
		if (event.keyCode === 13)
		    reset();

		// J || j
		if (event.keyCode === 74 || event.keyCode === 106)
		    _timer.inc();

		// K || k
		if (event.keyCode === 75 || event.keyCode === 107)
		    _timer.dec();

		// A || a
		if (event.keyCode === 65 || event.keyCode === 97)
		    _break.inc();

		// S || s
		if (event.keyCode === 83 || event.keyCode === 115)
		    _break.dec();

	} // keydownHandler

}());
