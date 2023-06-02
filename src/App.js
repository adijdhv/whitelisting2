 
import './App.css';
 
import { abi, contractAddress } from './web3Files/ABI';
 
import { ethers } from "ethers";
const { utils, BigNumber } = require("ethers");

//const { add , setadd } = useState("")

 

 

 
 


function App() {

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const ContractInstance = new ethers.Contract(contractAddress, abi, provider);
  const withsinger = ContractInstance.connect(signer);
  
  
  const Connect  = async () =>{
    try {
      let acnt = await provider.send("eth_requestAccounts", []);
      console.log(JSON.stringify(acnt[0]))
      
      let owner = await ContractInstance.owner() 
      console.log("OWNER OF CONTRACT : ",owner)
       
    } catch (error) {
      console.error()
    }
   

   
  }

  const claimToken = async() =>{
    let acnt = await provider.send("eth_requestAccounts", []);
    console.log(acnt)

    try {
      let  tx =  await withsinger.claimtokens(acnt[0]);
      console.log(tx)
      
    } catch (error) {
      console.log(error.message)
       
      //console.log( e.statusCode)
      
    }

  }

  //addUser(address _addressToWhitelis)
  const AddToWhitelist = async(add) =>{

    try {
      let acnt = await provider.send("eth_requestAccounts", []);
    console.log(acnt)
    let  tx =  await withsinger.addUser(add);
    console.log(tx)
      
    } catch (error) {
      alert("Only Owner can add to whitelist")

      
    }
    
    

  }

  //event WhiteListed(address _addressToWhitelist);
  ContractInstance.on("WhiteListed", (_addressToWhitelist, event) => {
    console.log(`${ _addressToWhitelist } Added to whitelist`);
   
    alert("whitelisted")
});
// event Claimed(uint amount, address _ClaimedBy);
ContractInstance.on("Claimed", ( amount,_ClaimedBy,  event) => {
  console.log(`${ _ClaimedBy } Claimed ${ ethers.utils.formatEther(amount) } Tokens `);
  alert("Token Claimed")
   
});


  





  return (
    <div className="App">
      <header className="App-header">
          
          <button onClick={Connect} className='lg-2'>
            Connect to Web3
          </button>
          <br/>
          
        
       
        
        <button onClick={claimToken}> Claim Token </button><br/>
        
        <input type="text" onChange={setadd(e.target.value)}/>
       <button onClick={AddToWhitelist}> Add To Whitelist </button>
       <p> Only Owner Can Add to whitelist*</p>
       
        
       
       
      </header>
    </div>
  );
}

export default App;
