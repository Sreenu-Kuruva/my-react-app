import { useState } from "react"
import "./App.css"

type FormData={
  name:string
  email:string
}

function App(){
  const [step,setStep]=useState<number>(1)
  const [formData,setFormData]=useState<FormData>({
    name:"",
    email:""
  })
  const[errors,setErrors]=useState<{name?: string;email?:string}>({})
  const validateStepOne=()=>{
    const newErrors:{name?:string}={}

    if(!formData.name.trim()){
      newErrors.name="Name is required"
    }
    setErrors(newErrors)
    return
    Object.keys(newErrors).length===0
  }
  const validateStepTwo=()=>{
      const newErrors:{email?:string}={}
      if(!formData.email.trim()){
      newErrors.email="Email is required"
    } 
    else if(!/^\S+@\S+\.\S+$/.test(formData.email)){
      newErrors.email="Invalid email format"
    }  
    setErrors(newErrors)
    return
     Object.keys(newErrors).length===0
  }
  const handleNext=()=>{
    if(step===1 && validateStepOne()){
      setStep(2)
      setErrors({})
    }
  }
  const handleBack=()=>{
    setStep(1)
    setErrors({})
  }
  const handleSubmit=()=>{
    if(validateStepTwo()){
      alert("Form submitted successfully")
      console.log(formData)
    }
  }
  return(
    <div className="container">
      <h2>Two Step Form</h2>
      {step===1 &&(
        <div className="form-step">
          <label>Name:</label>
          <input type="text"
          value={formData.name}
          onChange={(e)=>
            setFormData({...formData,name:e.target.value})
        }
        />
        {errors.name && <p className="error">{errors.name}</p>}
      <button type="button" onClick ={handleNext}>Next</button>
    </div>
    )}
    {step===2 &&(
      <div className="form-step">
        <label>Email</label>
        <input type="text"
        value={formData.email}
        onChange={(e)=>setFormData({...formData,email:e.target.value})}
        />
        {errors.email && <p className="error">{errors.email}</p>}
     <div className="button-group">
      <button onClick={handleBack}>Back</button>
       <button onClick={handleSubmit}>Submit</button>
     </div>
      </div>
    )}
    </div>
  )
}

export default App