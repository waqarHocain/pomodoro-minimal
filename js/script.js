(function() 
{
	// elems
	var mins_container = document.querySelector(".mins"),
		secs_container = document.querySelector(".secs"),
		state = document.querySelector(".state");

	var btn_start = document.querySelector(".start");

	// sound
	var alarm = new Audio("audio/horn.mp3");


	// Global vars
	var mins, secs = 0;
	var mins_def = 1;
	var interval_timer;

	var mins_brk, mins_def_brk = 1;
	var interval_brk;

	var timer_running = false;


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
		}
	}

	function dec_timer()
	 {
	 	if (!timer_running && mins > 1)
	 	{
	 		--mins_def;
	 		mins = mins_def;
	 		draw();
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
				start_brk();
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
		state.innerHTML = "Be Relax....";
		interval_brk = setInterval(timer_brk, 1000);
	}

	function stop_brk()
	{
		timer_running = false;
		clearInterval(interval_brk);
		state.innerHTML = "&nbsp";
	}



	function timer_brk()
	{
		if (secs === 0)
		{
			if (mins_brk === 0)
			{
				stop_brk();
				start();
				alarm.play();
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

		if (event.keyCode === 75 || event.keyCode === 107)
			dec_timer();

	} // keydownHandler

}());
