
const checkHugaName = (huga,res) => {
  if(huga == "연차"){
     console.log("Good");    
  }else if(huga == "오전반차"){
     console.log("Good");    
  }else if(huga == "오후반차"){
     console.log("Good");    
  }else{
     console.error('No~~~');
     res.status(500).send();
  }
}

const checkHugadate = (date,res) => {
  const todayDate = new Date(); //Today Date    
  const value = date.split("-");
  const dateOne = new Date(value[0], value[1], value[2]);    
  if (dateOne > todayDate) {    
     console.log("Today Date is greater than Date One.");    
  }else{
     console.error('No~~~');
     res.status(500).send();
  }    

}

module.exports = {
 checkHugadate,
 checkHugaName 
};
