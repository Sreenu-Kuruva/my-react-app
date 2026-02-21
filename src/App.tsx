import { useState } from "react"
import "./App.css"

type FormData = {
  fullName: string
  email: string
  role: string
  termsAccepted: boolean
}

function App() {
  const [step, setStep] = useState<number>(1)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    role: "",
    termsAccepted: false
  })

  const isStepOneValid =
    formData.fullName.trim() !== "" &&
    formData.email.trim() !== ""

  const isStepTwoValid =
    formData.role !== "" &&
    formData.termsAccepted === true

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container">
        <h2>Submission Summary</h2>
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Role:</strong> {formData.role}</p>
        <p>
          <strong>Terms Accepted:</strong>{" "}
          {formData.termsAccepted ? "Yes" : "No"}
        </p>
      </div>
    )
  }

  return (
    <div className="container">
      <h2>Two Step Form</h2>

      {step === 1 && (
        <div className="form-step">
          <label>Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />

          <label>Email Address</label>
          <input
            type="text"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <button
            type="button"
            disabled={!isStepOneValid}
            onClick={() => setStep(2)}
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <label>Role</label>
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          >
            <option value="">Select Role</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>

          <div className="checkbox">
            <input
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  termsAccepted: e.target.checked
                })
              }
            />
            <label>Accept Terms & Conditions</label>
          </div>

          <div className="button-group">
            <button type="button" onClick={() => setStep(1)}>
              Back
            </button>

            <button
              type="button"
              disabled={!isStepTwoValid}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App