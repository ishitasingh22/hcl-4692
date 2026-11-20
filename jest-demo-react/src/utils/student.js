export const isEligible=(atten)=>{
  if(atten<0 || atten>100){
    throw new Error('Attendance must be between 0 and 100');
  }
  return atten >= 75;
}