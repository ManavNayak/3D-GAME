#pragma strict
public var wayPoints : Transform[];

public var vehicleSpeed : float;
public var curWayPoint : int;
public var turningSpeed : float;

public var doPatrol : boolean = true;

public var target : Vector3;
public var moveDirection : Vector3;
public var Velocity : Vector3;

function Update()
{
	if(curWayPoint < wayPoints.Length)
	{
		target = wayPoints[curWayPoint].position;
		moveDirection = target - transform.position;
		Velocity = rigidbody.velocity;
		
		if(moveDirection.magnitude < 1)
		{
			curWayPoint++;
		}
		else
		{
			Velocity = moveDirection.normalized * vehicleSpeed;
		}		
	}
	else
	{
		if(doPatrol)
		{
			curWayPoint = 0;			
		}
		else
		{
			Velocity = Vector3.zero;
		}
	}
	rigidbody.velocity = Velocity;
	
	rigidbody.rotation = Quaternion.Slerp(transform.rotation,Quaternion.LookRotation(moveDirection),turningSpeed * Time.deltaTime);	
}
