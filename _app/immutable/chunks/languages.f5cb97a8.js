import{l as t}from"./store.47891479.js";function s(){return[{from:0,to:1,code:"de-en"},{from:0,to:2,code:"de-ru"},{from:0,to:3,code:"de-es"},{from:1,to:0,code:"en-de"},{from:1,to:2,code:"en-ru"},{from:1,to:3,code:"en-es"},{from:2,to:0,code:"ru-de"},{from:2,to:1,code:"ru-en"},{from:2,to:3,code:"ru-es"}]}function a(e){switch(e){case 0:return"Deutsch";case 1:return"Englisch";case 2:return"Russisch";case 3:return"Spanisch"}}function c(e){localStorage.setItem("language",JSON.stringify(e)),t.set(e)}function u(){const e=localStorage.getItem("language");return e?JSON.parse(e):null}var r=(e=>(e[e.None=0]="None",e[e.SelectAnswers=1]="SelectAnswers",e[e.EnterAnswers=2]="EnterAnswers",e))(r||{});function g(){return[1,2]}function i(e){localStorage.setItem("inputType",JSON.stringify(e))}function f(){const e=localStorage.getItem("inputType");return e?JSON.parse(e):1}var n=(e=>(e[e.None=0]="None",e[e.Text=1]="Text",e[e.Audio=2]="Audio",e))(n||{});function l(){return[1,2]}function d(e){localStorage.setItem("outputType",JSON.stringify(e))}function m(){const e=localStorage.getItem("outputType");return e?JSON.parse(e):3}export{r as I,n as O,a,m as b,l as c,f as d,g as e,s as f,u as g,i as h,d as i,c as s};