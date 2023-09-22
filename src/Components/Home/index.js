import "./index.css"
import { Component } from "react";

const pageStatusOptions={initial:"initial",error:"error",success:"success",otpVerified:"otpVerified"}

class Home extends Component{

    state = {fName:"",lName:"",mobileNumber:"",userOtp:"", otpSent:null,pageStatus:pageStatusOptions.initial,wrongOtpEntered:false}

    onchangeFname=event=>{
      this.setState({fName:event.target.value});
    }

    onchangeLname=event=>{
      this.setState({lName:event.target.value});
    }

    onChangeMobileNumber=event=>{
      this.setState({mobileNumber:event.target.value});
    }

    getData=async event=>{
        event.preventDefault();
        console.log("getData");
        const url = 'http://localhost:4000/send-otp';
        const headers = {
          'Content-Type': 'application/json',
        };
        const inputs ={number: this.state.mobileNumber }
        console.log(this.state.mobileNumber)
        const options = {
          method:'POST',
          headers: headers,
          body: JSON.stringify(inputs)
        }
        try{
        const response = await fetch(url,options)
        const data = await response.json();
        console.log(data);
        if(data.status==="queued"){
          this.setState({pageStatus:pageStatusOptions.success});
        }else{
          this.setState({otpSent: false});
        }
        }catch(e){
            this.setState({otpSent:false});
        }
    }


    renderHome=()=>{
      const {otpSent} = this.state
      return(
      <form onSubmit={this.getData} className="form">
            <div className="title">Welcome</div>
            <div className="subtitle">Let's create your account!</div>
            <div className="input-container ic1">
              <input onChange={this.onchangeFname} id="firstname" className="input" type="text" placeholder=" " />
              <div className="cut"></div>
              <label htmlFor="firstname" className="placeholder">First name</label>
            </div>
            <div className="input-container ic2">
              <input onChange={this.onchangeLname} id="lastname" className="input" type="text" placeholder=" " />
              <div className="cut"></div>
              <label htmlFor="lastname" className="placeholder">Last name</label>
            </div>
            <div className="input-container ic2">
              <input onChange={this.onChangeMobileNumber} id="email" className="input" type="number" placeholder=" " />
              <div className="cut cut-short"></div>
              <label htmlFor="email" className="placeholder">Mobile</label>
            </div>
            <button type="submit" className="submit">Submit</button>
            { otpSent===false && <p className="errorMsg">Something Went Wrong</p> }
          </form>
      )

    }

    sendOtpToBackend= async (e)=>{
      e.preventDefault();
      const {userOtp} = this.state
      const url = 'http://localhost:4000/verify-otp';
        const headers = {
          'Content-Type': 'application/json',
        };
        const inputs ={userOtp: userOtp }
        const options = {
          method:'POST',
          headers: headers,
          body: JSON.stringify(inputs)
        }
        const response = await fetch(url,options)
        const data = await response.json();
        if(data){
          this.setState({pageStatus:pageStatusOptions.otpVerified})
        }else{
          this.setState({wrongOtpEntered:true})
        }

    }

    renderOtpSentPage=()=>{
      return(
        <div className="form">
          <h1 className="title">OTP Sent Successfully</h1>
          <form>
          <div className="input-container ic2">
              <input onChange={(e)=> this.setState({userOtp:e.target.value})} min={5} id="otp-input" className="input" type="number" placeholder=" " />
              <div className="cut"></div>
              <label htmlFor="otp-input" className="placeholder">Enter OTP</label>
            </div>
            <button onClick={this.sendOtpToBackend} type="submit" className="submit">Submit</button>
            {this.state.wrongOtpEntered && <p className="errorMsg">Wrong OTP</p>}
          </form>
        </div>
      )
    }

    renderOtpVerifiedPage=()=>(
      <div className="form">
        <h1 className="title">OTP Verified</h1>
      </div>
    )


    renderSwitch=() => {
      switch (this.state.pageStatus) {
        case pageStatusOptions.initial:
          return this.renderHome();
        case pageStatusOptions.success:
          return this.renderOtpSentPage();
        case pageStatusOptions.error:
          return this.renderError();
        case pageStatusOptions.otpVerified:
          return this.renderOtpVerifiedPage();
        default:
          return this.renderError();
      }
    }

    render(){
        return (
            <div>
              {this.renderSwitch()}
            </div>
        )
    }
} 

export default Home;
