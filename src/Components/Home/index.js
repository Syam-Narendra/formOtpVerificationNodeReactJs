import "./index.css"
import { Component } from "react";

class Home extends Component{

    state = {fName:"",lName:"",mobileNumber:"", otpSent:null}

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
        const response = await fetch('http://localhost:4000/send-otp');
        const data = await response.json();
        console.log(data.status==="queued");
        if(data.status==="queued"){
          this.setState({otpSent: true});
        }else{
          this.setState({otpSent: false});
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

    renderOtpSentPage=()=>{
      return(
        <div className="form">
          <h1 className="title">OTP Sent Successfully</h1>
          <form>
          <div className="input-container ic2">
              <input min={5} id="otp-input" className="input" type="number" placeholder=" " />
              <div className="cut"></div>
              <label htmlFor="otp-input" className="placeholder">Enter OTP</label>
            </div>
            <button type="submit" className="submit">Submit</button>
          </form>
        </div>
      )
    }
    render(){
        const {otpSent}= this.state
        return (
            <div>
              {otpSent ? this.renderOtpSentPage(): this.renderHome()}
            </div>
        )
    }
} 

export default Home;