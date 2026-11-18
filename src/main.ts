import {desk} from "@shared/desk";
import {wrap} from "@shared/surface";
let tasks=["Dishes","Shopping","Laundry"];
type S={n:number;score:number;votes:number[];pass:boolean;at:number};
const init=():S=>({n:0,score:3,votes:[],pass:false,at:0});
function split(v:number[]){let opt=1,best=Infinity;for(let mask=1;mask<7;mask++){let a=0,b=0;for(let i=0;i<3;i++)if(mask&(1<<i))a+=v[i];else b+=v[3+i];const cost=Math.max(a,b)*100+a+b;if(cost<best){best=cost;opt=mask;}}return opt;}
desk<S>({name:"Chore Auction",accent:"#ECA64C",motion:{enabled:false},initial:init,configure:(_,v)=>{const names=String(v.chores||"").split(",").map(t=>t.trim()).filter(Boolean);if(names.length===3)tasks=names;},
 render:s=>{const done=s.n===6,choice=done?((split(s.votes)&(1<<s.at))?"Player A":"Player B"):"";
 return {title:s.pass?"Pass the bar":done?tasks[s.at]:"Bid / "+(s.n<3?"A":"B"),value:s.pass?"Player B":done?choice:String(s.score)+" effort",
 lines:[s.pass?"Hand to player B":tasks[done?s.at:s.n%3],done?"Assigned to "+choice:"Rate personal effort 1-5",done?"Both receive a chore":"Previous bids hidden",
 done?"Wheel: inspect split":"Wheel: rate effort",s.pass?"Click: start B's bids":"Click: lock bid","Hold Start: new auction"]};},
 action:(s,k)=>{if(k==="hold-start"){Object.assign(s,init());return;}if(s.pass){if(k==="ok")s.pass=false;return;}
 if(s.n===6){if(k==="up"||k==="down")s.at=wrap(s.at+(k==="up"?1:-1),3);return;}
 if(k==="up"||k==="down")s.score=Math.max(1,Math.min(5,s.score+(k==="up"?1:-1)));
 if(k==="ok"){s.votes.push(s.score);s.n++;s.score=3;if(s.n===3)s.pass=true;}}});
