/*
* The MIT License (MIT)
*
* Copyright (c) 2017 Shubhrendu Tripathi
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
*/

/*************************************************************************
References:

Meeus, Jean H. Astronomical algorithms. Willmann-Bell, Incorporated, 1998.

**************************************************************************/

console.log("astroal: start...");

var phi = 43.7; //latitude
var D = 90; //gnomonic declination: 0 - due south, 270 - due east,
                    //180 - due north, 90 - due west
var z = 0; //zenithal distance: 0 - sundial is horizontal, 90 - sundial is vertical
var x, y;
//x, y - tip of the shadow of the straight stylus
//x - horizontal, measured positively towards the right
//y - line of greatest slope of the sundial , positive upwards

var a; //length of the straight stylus
//origin of the orthogonal coordinate system - footprint of the stylus

var H = [-130,-115,-105,-90,-75,-60,-45,-30,-15,
              0,15,30,45,60,75,90,105,115,130];
//var H = 0;  //Sun's hour angle - measured from the upper meridian transit (true noon)
            //increases 15 degress per hour
            //-45 degrees = 9 hours am
            //0 degrees = 12 noon - that means that the sun is directly on top - no shadow
            //+15 degress = 1 hour pm

//-130 - 3 pm
//-115 - 4 am
//-105 - 5 am
//-90 - 6 am
//-75 - 7 am
//-60 - 8 am
//-45 - 9 am
//-30 - 10 am
//-15 - 11 am
//0 - 12 noon
//+15 - 1 pm
//+30 - 2 pm
//+45 - 3 pm
//+60 - 4 pm
//+75 - 5 pm
//+90 - 6 pm
//+105 - 7 pm
//+115 - 8 pm
//+130 - 9 pm

var delta = [-23.44, -20.15, -11.47, 0, +11.47, +20.15, +23.44];
//var delta; //for each hour angle H the declination delta of the Sun will
                //take successive values (in degrees)
                //-23.44, -20.15, -11.47, 0, +11.47, +20.15, and +23.44
                //which correspond to the dates when the longitude of the Sun
                //is a multiple of 30 degrees
                //during the day, tip of the shadow of the stylus -
                //a conic - a circle, an ellipse, a parabola, or an hyperbola
                //delta = 0 - curve is always a straight line

var P, Q, Nx, Ny;

function PQNxNy(){
  P = (Math.sin(phi) * Math.cos(z)) - (Math.cos(phi) * Math.sin(z) * Math.cos(D));
  Q = (Math.sin(D)*Math.sin(z)*Math.sin(H)) +
          ((Math.cos(phi)*Math.cos(z)) + (Math.sin(phi)*Math.sin(z)*Math.cos(D)) * Math.cos(H)) +
          (P * Math.tan(delta));
  Nx = (Math.cos(D)*Math.sin(H)) - (Math.sin(D) *(Math.sin(phi)*Math.cos(H)) - (Math.cos(phi)*Math.tan(delta)));
  Ny = (Math.cos(z)*Math.sin(D)*Math.sin(H)) - (((Math.cos(phi)*Math.sin(z)) - (Math.sin(phi)*Math.cos(z)*Math.cos(D)))*Math.cos(H))
                                              - (((Math.sin(phi)*Math.sin(z)) + (Math.cos(phi)*Math.cos(z)*Math.cos(D)))*Math.tan(delta));

  return P,Q,Nx,Ny;
}

//for each hour angle, one obtains a series of points
//by connecting these points, an hour line is created on the sundial

console.log(PQNxNy());

console.log("astroal: end.")
