

function ValidateNationalId(nationalId){

    var L=nationalId.length;
 
    if( L < 8 || parseInt(nationalId,10) === 0 ) return false;
 
    nationalId =( '0000' + nationalId ).substr( L + 4 - 10 );
 
    if( parseInt( nationalId.substr(3,6), 10) === 0) return false;
 
    var c = parseInt( nationalId.substr(9,1), 10);
    var s = 0;
 
    for(var i = 0;i < 9;i++)
       s += parseInt(nationalId.substr(i,1),10) * (10 - i);
    s = s % 11;
 
    return (s < 2 && c === s ) || (s >= 2 && c === (11-s));
 }
 
 export default ValidateNationalId