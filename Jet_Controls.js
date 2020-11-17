 	var Obj : Rigidbody;
	var zrotForce : float = 1;
	var MaxRot : float = 90;
	var MinRot : float = -90;
	var rotupForce : float = 1;
	var rotdownForce : float = 1;
	var speed : float;
	var speedincrease : float;
	var speeddecrease : float;
	
	var enginePower : int;
	var maxSpeed : float;
	var minSpeed : float;
	
	var Maxspeed1 : float;
	var Minspeed1 : float;
	var Maxspeed2 : float;
	var Minspeed2 : float;
	var Maxspeed3 : float;
	var Minspeed3 : float;
	var takeoffspeed : float;
	var lift : float;
	var minlift : float;
	var hit = false;
	
	var cam2 : Camera;
function Start () 
{
    InvokeRepeating("Speed", .1, .1);
	cam2.enabled = false;
}

function Speed()
{

	if (Input.GetKey(KeyCode.Space))
		{
			if(speed < maxSpeed)
			{
				Mathf.Repeat(1,Time.time);
	    		speed=speed+speedincrease;
	    	}
	    }
	if (Input.GetKey(KeyCode.LeftAlt))
		{
			if(enginePower == 3 && speed > Minspeed3)
			{
				Mathf.Repeat(1,Time.time);
	    		speed=speed-speedincrease;
	    	}
	    	else if(enginePower == 2 && speed > Minspeed2)
			{
				Mathf.Repeat(1,Time.time);
	    		speed=speed-speedincrease;
	    	}
	    	else if(enginePower == 1 && speed > Minspeed1)
			{
				Mathf.Repeat(1,Time.time);
	    		speed=speed-speedincrease;
	    	}
    }
}


function Update () 
	{
		if(Input.GetKey(KeyCode.C))
		{
			cam2.enabled = ! cam2.enabled;
		}
		
		var spd = Obj.velocity.magnitude;
		Obj.rigidbody.AddRelativeForce(0,0,-speed);
	    
	    H=(Input.GetAxis ("Horizontal"))*zrotForce;
	    if (H)
	    {
	    	Obj.rigidbody.AddRelativeTorque(0, 0, H*(spd/100));
	    }
	    
	    V=(Input.GetAxis ("Vertical"))*rotupForce;
	    if (V)
	    {
	    	Obj.rigidbody.AddRelativeTorque(V*(spd/100), 0, 0);
	    }
	    
	    if(Input.GetKey(KeyCode.Keypad1))
	    {
	    	enginePower = 1;
		   	//speed level 1
		    maxSpeed = Maxspeed1;		    
			minSpeed = Minspeed1;		    		   
	    }
	    else if(Input.GetKey(KeyCode.Keypad2))
	    {
	    	enginePower = 2;
		   	//speed level 2
		    maxSpeed = Maxspeed2;		    
			minSpeed = Minspeed2;		 
	    }
	    else if(Input.GetKey(KeyCode.Keypad3))
	    {
		   	enginePower = 3;
		   	//speed level 3
		    maxSpeed = Maxspeed3;		    
			minSpeed = Minspeed3;
	    }
	    
	    if (speed<takeoffspeed)
	    {
			Obj.rigidbody.AddForce(0,minlift,0);
		}
		
		if(speed>takeoffspeed)
		{
			Obj.rigidbody.AddForce(0,lift,0);
		}
		
		if (Obj.rigidbody.rotation.z>MaxRot)
		{
			Obj.rigidbody.rotation.z=MaxRot;
		}
		if (Obj.rigidbody.rotation.z<MinRot)
		{
			Obj.rigidbody.rotation.z=MinRot;
		}
		if (Obj.rigidbody.rotation.x>MaxRot)
		{
			Obj.rigidbody.rotation.x=MaxRot;
		}
	}
