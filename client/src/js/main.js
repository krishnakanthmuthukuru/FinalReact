var React = require('react');
var Router = require('react-router');

var major_cities  =["Mumbai","Delhi","Bangalore","Hyderabad","Ahmadabad","Chennai","Kolkata","Surat","Pune","Jaipur","Puducherry"];
var WeatherForeCast =React.createClass({
getInitialState: function() {
 var intial=[];
 var except =major_cities  ;
 $.ajax({
       url: '/api/list',
       dataType: 'json',
       async:false,
       success: function(data) {
         intial=data;
         data.map(function(d){
           if(except.indexOf(d.name)!=-1){
             except.splice(except.indexOf(d.name),1);
           }
         });
       }.bind(this)
     });
     return ({data:intial,data1:except});
},

render:function(){
 var a=this;
 return (
<div className="row">
    {this.state.data.map(function(d){
      return (

        <div className="col-lg-12 well">
           <button className="btn btn-link" type="submit"  data-toggle="modal" data-target="#myModal" value={d.name} onClick={a.viewmore}>{d.name},{d.sys.country}</button>
       {d.weather[0].description}
       <p>
          <span className="badge">{d.main.temp}</span>temperature from {d.main.temp_min} to {d.main.temp_max}°С, wind {d.wind.speed}m/s. clouds {d.clouds.all}%, {d.main.sea_level} hpa
       </p>
       <p>
          geo coords:[{d.coord.lon},{d.coord.lat}]
      </p>

         <div className='col-lg-6'>
           <button className="btn btn-info" type="submit" value={d} onClick={a.addToDB}>Refresh</button>
           </div>
           </div>
      );
    })}

{this.state.data1.map(function(d){
 return(
   <div className='col-lg-12'>
   <div className='col-lg-6'>
   {d}
   </div>
     <div className='col-lg-6'>
       <button className="btn btn-warning" type="submit" value={d} onClick={a.addToDB}>Refresh</button>
       </div>
       </div>
 );
})}
</div>
)
},

addToDB:function(q){
 $.ajax({
 url:"http://api.openweathermap.org/data/2.5/weather?e="+q.target.value+"&appid=a7741f2fb71480460ac240bc2909bcde",
dataType:'json',
success:function(data){
 var data1=this.state.data1;
           if(data1.indexOf(name)!=-1){
                 $.ajax({
                     url: "/api/weather",
                     dataType: 'json',
                     data:JSON.stringify(data),
                     type:"POST",
                     contentType:'application/json',
                     success: function(data){
                alert(d.name+'data added Successfully');
                     }.bind(this)
                   });
                   data1.splice(data1.indexOf(name),1);
                   var self=this.state.data;
                   self.push(data);
                   this.setState({data:self,data1:data1});
           }
           else{
                  $.ajax({
                     url: "/api/update/"+name,
                     data:data,
                     type:"PUT",
                     success: function(d){
                  alert(d+'data updated Successfully');
                     }.bind(this)
                   });
           }
}.bind(this)
});
}
});

React.render(<WeatherForeCast />,document.getElementById('app'));
