import moment  from "moment";
import * as momentPreciseRange from "moment-precise-range-plugin";

export const dateFormat = function(value, type = 'TimeDate') {
    if(type == 'TimeDate') return new Date(value).toLocaleString();
    else if(type == 'Time') return new Date(value).toLocaleTimeString();
    else if(type == 'Date') return new Date(value).toLocaleDateString();
    else if(type == 'Weekday') return new Date(value).toLocaleString('default', { weekday:'long'});
    else if(type == 'WeekdayDate') {
        return new Date(value).toLocaleString('default', { weekday:'short'})+", "+
                new Date(value).toLocaleDateString();
    }   
    return new Date(value).toLocaleString;
}

export const workHourFormat = function(value) {
   if(value[0]==0) return value[1]+" minutes";
   else return value[0]+ " hours "+value[1]+" minutes";
}

export const getWorkHourDataType = function(time1, time2){
    let time =[];
    time[0] = moment.preciseDiff(time1, time2, true)["hours"];
    time[1] = moment.preciseDiff(time1, time2, true)["minutes"]
    return time;
}

export const plus2workHours = function(time1, time2){
    let time =[];
    time[1] = (time1[1] + time2[1])%60;
    time[0] = (time1[0] + time2[0]) + ((time1[1] + time2[1])-time[1])/60;
    return time;
}

export const duration = function(time1, time2){
    var result = "";
    if(time1 < time2){
        result = moment.preciseDiff(time1, time2, false);
    }     
    return result;
}

export const endPeriodDate = function(start){
    // report every 14 days.
    let date = moment(new Date(start)).add(7,'days').toISOString();
    date = new Date(date);
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    return date.toISOString();
}
export const startPeriodDate = function(end){
    let date = moment(new Date(end)).add(1,'days').toISOString();
    date = new Date(date);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date.toISOString();
}
