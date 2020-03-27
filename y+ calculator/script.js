function ChangeFlowType() {
  var ExternalFlowInfo = document.getElementById("ExternalFlow");
  var dimTypeInfo = document.getElementById("dimType");
  var imgInfo = document.getElementById("ImgFlowType");
  if (ExternalFlowInfo.checked) {
    dimTypeInfo.innerHTML = "Length";
    imgInfo.src = "http://www.computationalfluiddynamics.com.au/wp-content/uploads/2016/03/external.png";
  } else {
    dimTypeInfo.innerHTML = "Diameter";
    imgInfo.src = "http://www.computationalfluiddynamics.com.au/wp-content/uploads/2016/03/internal.png";
  }
}

function ComputeCellHight() {
  var YPlus = document.getElementById("InputTargetYPlus").value;

  var isFluent = document.getElementById("RadioFluent").checked;
  var isAIM = document.getElementById("RadioAIM").checked;
  var isCFX = document.getElementById("RadioCFX").checked;

  var isExternal = document.getElementById("ExternalFlow").checked;
  var isInternal = document.getElementById("InternalFlow").checked;

  var Velocity = document.getElementById("InputVelocity").value;
  var Length = document.getElementById("InputLength").value;
  var Density = document.getElementById("InputDensity").value;
  var Nu = document.getElementById("InputNu").value;

  var factor = 1.0;
  if (isFluent || isAIM)
    factor = 2.0;

  var Re = Density * Velocity * Length / Nu;
  var frictionCoff = 0.0;

  if (isExternal) {
    frictionCoff = 0.058 * Math.pow(Re, -0.2);
  } else {
    frictionCoff = 0.079 * Math.pow(Re, -0.25);
  }

  var frictionVel = Math.sqrt(0.5 * frictionCoff * Math.pow(Velocity, 2));
  var height = factor * YPlus * Nu / (Density * frictionVel);
  var cHightM = document.getElementById("cHightM");
  var cHightMM = document.getElementById("cHightMM");
  cHightM.innerHTML =  height.toExponential(5);
  height = height * 1000;
  cHightMM.innerHTML = height.toPrecision(6);
}
