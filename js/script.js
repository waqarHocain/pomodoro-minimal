(function() 
{
	// elems
	var mins_container = document.querySelector(".mins"),
		secs_container = document.querySelector(".secs"),
		state = document.querySelector(".state");

	var timer_time = document.querySelector(".timer_time"),
		break_time = document.querySelector(".break_time");

	var btn_start = document.querySelector(".start");

	// sound
	var alarm = new Audio("audio/horn.mp3");


	// Global vars
	var mins, secs = 0;
	var mins_def = 2;
	var interval_timer;

	var mins_brk, mins_def_brk = 1;
	var interval_brk;

	var timer_running = false;


	break_time.innerHTML = mins_def_brk;
	timer_time.innerHTML = mins_def;


	// bindings
	window.addEventListener("keydown", keydownHandler, false);
	btn_start.onclick = start;

	// Main function
	var main = function()
	{
		init();
		draw();

		state.innerHTML = "&nbsp";
	};
	main();


	// assign default values of mins & secs
	function init()
	{
		mins = mins_def;
		secs = 0;

	} // init

	// put the values into html
	function draw()
	{
		mins_container.innerHTML = mins < 10 ? "0" + mins : mins;
		secs_container.innerHTML = secs < 10 ? "0" + secs : secs;
	} // draw

	

	/**
	 *
	 * Functions to start, pause and reset the timer
	 *
	 */
	function start()
	{
		draw();

		timer_running = true;
		state.innerHTML = "<strong>It's Work time... Try more harder..</strong>"
		interval_timer = setInterval(timer, 1000);
	}

	function pause()
	{
		timer_running = false;
		clearInterval(interval_timer);
	}

	function reset()
	{
		timer_running = false;
		clearInterval(interval_timer);

		main();
	}


	/**
	 *
	 * Functions to increment, decrement the pomodoro timer
	 *
	 */
	function inc_timer()
	{
		if (!timer_running && mins < 99)
		{
			++mins_def;
			mins = mins_def;
			draw();
			timer_time.innerHTML = mins_def;
		}
	}

	function dec_timer()
	 {
	 	if (!timer_running && mins > 1)
	 	{
	 		--mins_def;
	 		mins = mins_def;
	 		draw();
	 		timer_time.innerHTML = mins_def;
	 	}
	 }
	

	/**
	 *
	 * Main fuction, which is responsible for adjusting time
	 *
	 */
	function timer()
	{
		if (secs === 0)
		{
			if (mins === 0)
			{
				reset();
				alarm.play();
				setTimeout(start_brk, 1000);
			}
			else
			{
				secs = 59;
				--mins;
			}

		}
		else
			--secs;

		draw();
	} // timer


	/**
	 *
	 * Here goes the functions, which are related to BREAK TIME!
	 *
	 */

	init_brk();	// assign mins_brk = mins_def_brk on start

	function main_brk()
	{
		init_brk();
		draw_brk();
	}

	function init_brk()
	{
		mins_brk = mins_def_brk;
		secs = 0;
	}

	function draw_brk()
	{
		mins_container.innerHTML = mins_brk < 10 ? "0" + mins_brk : mins_brk;
		secs_container.innerHTML = secs < 10 ? "0" + secs : secs;
	}

	function start_brk()
	{
		main_brk();

		timer_running = true;
		state.innerHTML = "<strong>Be Relax....</strong>";
		interval_brk = setInterval(timer_brk, 1000);
	}

	function stop_brk()
	{
		timer_running = false;
		clearInterval(interval_brk);
		state.innerHTML = "&nbsp";
	}

	function inc_brk()
	{
		if (!timer_running && mins_brk < 99)
		{
			++mins_def_brk;
			mins_brk = mins_def_brk;

			break_time.innerHTML = mins_def_brk;
		}
	}

	function dec_brk()
	{
		if (!timer_running && mins_brk > 1)
		{
			--mins_def_brk;
			mins_brk = mins_def_brk;

			break_time.innerHTML = mins_brk;
		}
	}



	function timer_brk()
	{
		if (secs === 0)
		{
			if (mins_brk === 0)
			{
				stop_brk();
				alarm.play();
				setTimeout(start, 1000);
			}
			else
			{
				secs = 59;
				--mins_brk;
			}

		}
		else
			--secs;

		draw_brk();
	} // timer_brk



	
	// Handler function
	function keydownHandler(event)
	{
		// 32 === Space Bar
		if(event.keyCode === 32)
		{
			if (timer_running)
				pause();
			else
				start();
		}

		// 13 === Enter Key
		if (event.keyCode === 13)
			reset();

		// J || j
		if (event.keyCode === 74 || event.keyCode === 106)
			inc_timer();

		// K || k
		if (event.keyCode === 75 || event.keyCode === 107)
			dec_timer();

		// A || a
		if (event.keyCode === 65 || event.keyCode === 97)
			inc_brk();

		// S || s
		if (event.keyCode === 83 || event.keyCode === 115)
			dec_brk();

	} // keydownHandler

}());
