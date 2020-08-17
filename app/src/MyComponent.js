import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import { toast } from "react-toastify";
import { Accordion , Button , Card } from 'react-bootstrap';
const { ContractData } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  const [products, setProducts] = React.useState([]);
  const [values, setValue] = React.useState();
  const [values1, setPrice] = React.useState();
  const [accountName, setAccountName] = React.useState(
      "Account 1"
  );
  const [currentAccount, setCurrentAccount] = React.useState(
    drizzleState.accounts[0]
  );

  const handleCreateProduct = () => {
    console.log(values1);
    console.log(values);
    const tx = drizzle.contracts.DeveloperProductFactory.methods.createProduct(values , parseInt(values1) , accountName).send({
      value: "4",
      from: currentAccount,
      gasLimit: 2100000,
    });
    tx.then(({ events }) => {
      products.unshift(events.DeveloperProductCreated.returnValues["newProductAddress"]);
      toast.success("Success", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch((error) => {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  const handleBuyProduct = (addr) => {
    const tx = drizzle.contracts.DeveloperProductFactory.methods.buyProduct(addr , accountName).send({
      value: "1",
      from: currentAccount,
      gasLimit: 2100000,
    });
    tx.then(({ events }) => {
      toast.success("Success", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location = "/";
    }).catch((error) => {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    });
  };

  const handleOnChange = (event) => {
    setCurrentAccount(event.target.value);
    var index = event.target.selectedIndex;
    setAccountName(event.target[index].text);
  };

  const handleChangeText = (event) => {
    setValue(event.target.value);
  };

  const handleChangeText1 = (event) => {
    setPrice(event.target.value);
  };

  React.useEffect(() => {
    async function getAllSurveys() {
      const surveyArr = await drizzle.contracts.DeveloperProductFactory.methods
        .getProductAddress()
        .call();
      // Because the array is frozen in strict mode, you'll need to copy the array before sorting it:
      // https://stackoverflow.com/a/53420326
      setProducts(surveyArr.slice());
      //console.log(surveyArr);
    }
    getAllSurveys();
  });
  // destructure drizzle and drizzleState from props

  return (
    <div className="App" >
      <div>
        <h1 style={{backgroundColor:"black",color:"white"}}>IndyDevs Marketplace</h1>
      </div>
      <br></br>
      <div style={{backgroundColor:"#db87f5"}}>
        <label htmlFor="account-select">Choose an account &nbsp; : &nbsp;</label>
        <select
          name="accounts"
          id="account-select"
          value={currentAccount}
          onChange={handleOnChange}
        >
          {Object.keys(drizzleState.accounts).map((x, index) => (
            <option key={x} value={drizzleState.accounts[index]}>
              {`Account ${index + 1}`}
            </option>
          ))}
        </select>
      </div>
            <br></br>
      <div style={{backgroundColor:"azure"}}>
        <div>
          <div>Product creation fees : </div>
          <div>
            <ContractData
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="DeveloperProductFactory"
              method="productCreationFees"
            />{" "}
            Ether
          </div><br></br>
          <label for="prodText">Enter the product name &nbsp; : &nbsp;</label>
          <input id="prodText" type="text" onChange={handleChangeText}></input><br></br>
          <label for="prodPrice">Enter the product price &nbsp; : &nbsp;</label>
          <input id="prodPrice" type="text" onChange={handleChangeText1}></input><br></br>

          <button onClick={handleCreateProduct}>Create Product</button>
          <br></br>
        </div>
        <br></br>
        <br></br>
        <div>
          <div style={{backgroundColor:"#db87f5"}}>
            <strong>Product List</strong>
          </div>
          <Accordion defaultActiveKey="0">
              {products.map((surveyAddr, index) => (
                <Card>
                <Card.Header style={{backgroundColor:"#a5edf2",color:"#269c19"}}>
                  <Accordion.Toggle as={Button} variant="link" eventKey={`"${index}"`}>

                  <ContractData
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                      contract="DeveloperProductFactory"
                      method="getProductDetails"
                      methodArgs={[`${surveyAddr}`]}
                    />
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={`"${index}"`}>
                  <Card.Body style={{backgroundColor:"#e87bb7"}}>
                    <div style={{backgroundColor:"gold"}}>
                     <span style={{fontWeight : "bold"}}>Owner</span> 
                    <br></br>
                    <ContractData
                       drizzle={drizzle}
                       drizzleState={drizzleState}
                       contract="DeveloperProductFactory"
                       method="productToOwnerName"
                       methodArgs={[`${index}`]}
                     />
                     </div>
                     <br></br>
                     <div style={{backgroundColor:"silver"}}>
                     <span style={{fontWeight : "bold"}}>Product Users</span>
                    <ContractData
                      drizzle={drizzle}
                      drizzleState={drizzleState}
                      contract="DeveloperProductFactory"
                      method="getProductUsers"
                      methodArgs={[`${surveyAddr}`]}
                    />
                    </div><br></br>
                    <button onClick={() => { handleBuyProduct(surveyAddr) }}>Buy</button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              ))}
        </Accordion>
      </div>
      </div>
      </div>
  );
};