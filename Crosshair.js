#pragma strict
var isTriggered : boolean = false;
public var crossHairTexture : Texture2D;
public var normalCH : Texture2D;
public var lockedCH : Texture2D;
var crosshairTransform : Transform;

function Start()
{
	Screen.showCursor = false;
}

function Update () 
{
	if(Input.GetKey(KeyCode.V))
	{
		isTriggered = ! isTriggered;	
	}
}

function OnGUI()
{
	var vectorx = Input.mousePosition.x;
	var vectory = Input.mousePosition.y;
	if(isTriggered)
	{
		GUI.DrawTexture(Rect(vectorx-30 ,-vectory + Screen.height-30 ,60,60),crossHairTexture);
	}
}
