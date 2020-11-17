 #pragma strict
var SpawnRight : Transform;
var SpawnLeft : Transform;
private var lockedTarget : Transform;

var SpawnRightFlag : boolean = true;
var SpawnLeftFlag : boolean = false;
var missileLock : boolean = false;
public var targetLockedFlag : boolean = false;

var missileLockTimer : float = 0;

var Missle : Rigidbody;

var waitTime : int;
var speed : int;
var numberOfMissiles : int;

var lockSound : AudioClip;
var missileFire : AudioClip;

private var ray : Ray;
private var hit : RaycastHit;

var missileTurn : float;

function Update () 
{
    if(Input.GetKeyDown(KeyCode.Mouse1) && numberOfMissiles > 0 )
    {    	
    	if(SpawnRightFlag)
    	{   
    		var instanceRight : Rigidbody;
    		audio.PlayOneShot(missileFire);
	    	if(targetLockedFlag == true)
	    	{
	    		SpawnRight.rotation = Quaternion.Slerp(SpawnRight.rotation,Quaternion.LookRotation(lockedTarget.position SpawnRight.position),missileTurn * Time.deltaTime);
	    		SpawnRight.position += SpawnRight.forward * speed * Time.deltaTime;
	    		instanceRight = Instantiate(Missle,SpawnRight.position,SpawnRight.rotation);    			    		
	    		instanceRight.velocity = SpawnRight.forward * speed;
	    	} 
	    	else
	    	{		  		    
		    	instanceRight = Instantiate(Missle, SpawnRight.position, SpawnRight.rotation);
		    	instanceRight.velocity = SpawnRight.forward * speed;	    
		    }
		    SpawnRightFlag = false;
		    SpawnLeftFlag = true;
		    numberOfMissiles--;
		}
		else if (SpawnLeftFlag)
		{	
		    var instanceLeft : Rigidbody;
    		audio.PlayOneShot(missileFire);
	    	if(targetLockedFlag == true)
	    	{
	    		SpawnLeft.rotation = Quaternion.Slerp(SpawnLeft.rotation,Quaternion.LookRotation(lockedTarget.position - SpawnLeft.position),missileTurn * Time.deltaTime);
	    		SpawnLeft.position += SpawnLeft.forward * speed * Time.deltaTime;
	    		instanceLeft = Instantiate(Missle,SpawnLeft.position,SpawnLeft.rotation);    			    		
	    		instanceLeft.velocity = SpawnLeft.forward * speed;
	    	} 
	    	else
	    	{		  		    
		    	instanceLeft = Instantiate(Missle, SpawnLeft.position, SpawnLeft.rotation);
		    	instanceLeft.velocity = SpawnLeft.forward * speed;	    
		    }
		    SpawnRightFlag = true;
		    SpawnLeftFlag = false;
		    numberOfMissiles--;
		}
    }
	ray = Camera.main.ScreenPointToRay(Input.mousePosition);	
	
    if(Physics.Raycast(ray, hit)&&SpawnRightFlag==true)
    {    	
    	if(hit.collider.tag.Equals("ptr80")&&missileLock == false)
    	{         			
    		audio.PlayOneShot(lockSound);    		
    		missileLock = true;
    		if(missileLock == true)
    		{    			
    			StartCoroutine("modifyMLockCounter");    			   			
    		}       		
    	}
    	else if(!hit.collider.tag.Equals("ptr80"))
    	{
    		audio.Stop();
    		missileLock = false;
    		if(missileLock == false)
    		{    			
    			StopCoroutine("modifyMLockCounter");
    			StartCoroutine("holdMissileLock");
    		}
    	}    	
	    var rPoint: Vector3 ;
	    if(targetLockedFlag == true)
	    {
	    	rPoint = lockedTarget.position;
	    }
	    else
	    {
	    	rPoint = hit.point;
	    }
	    SpawnRight.transform.LookAt(rPoint);
    }
    else if(Physics.Raycast(ray, hit)&&SpawnLeftFlag==true)
    {
        if(hit.collider.tag.Equals("ptr80")&&missileLock == false)
    	{         			
    		audio.PlayOneShot(lockSound);    		
    		missileLock = true;
    		if(missileLock == true)
    		{    			
    			StartCoroutine("modifyMLockCounter");
    		}    		   		    	
    	}
    	else if(!hit.collider.tag.Equals("ptr80"))
    	{
    		audio.Stop();
    		missileLock = false;
    		if(missileLock == false)
    		{    			
    			StopCoroutine("modifyMLockCounter");
    			StartCoroutine("holdMissileLock");
    		}  	    		
    	}    	
	    var lPoint: Vector3 ;
	    if(targetLockedFlag == true)
	    {
	    	lPoint = lockedTarget.position;
	    }
	    else
	    {
	    	lPoint = hit.point;
	    }
	    SpawnLeft.transform.LookAt(lPoint);
    }    
}

function modifyMLockCounter()
{		
    
	if(missileLock == true)
	{
		yield WaitForSeconds(4);
    	missileLockTimer = 4;
    }
    if(missileLockTimer == 4)
    {
    	lockedTarget = hit.collider.transform;
    	targetLockedFlag = true;
    } 
}
function holdMissileLock()
{	
	yield WaitForSeconds(3);
	//crossHairTexture = normalCH;
	missileLockTimer = 0;
	lockedTarget = null;
	targetLockedFlag = false;	 	
}
