/* eslint-disable react/prop-types */


import { useState, useRef, useEffect } from "react"

const Stepper = ({ stepsConfig = [] }) => {
    const [currentStep, setCurrentStep] = useState(1)
    const [isCompleted, setIsCompleted] = useState(false)
    const [margins, setMargins] = useState({
        marginLeft: 0,
        marginRight: 0,
    })
    const stepRef = useRef([])

    useEffect(() => {
        setMargins({
            marginLeft: stepRef.current[0].offetWidth / 2,
            marginRight: stepRef.current[stepsConfig.length - 1].offetWidth / 2,
        })
    }, [stepRef])

    if (!stepsConfig.length) return <></>

    const handleNext = () => {
        setCurrentStep((prevStep) => {
            if (prevStep === stepsConfig.length) {
                setIsCompleted(true)
                return prevStep
            } else {
                return prevStep + 1;
            }
        })
    }

    const ActiveComponent = stepsConfig[currentStep - 1]?.Component


    const calcuateWidth = () => {
        return ((currentStep - 1) / (stepsConfig.length - 1)) * 100
    }

    return (
        <>
            <div className="stepper">
                {stepsConfig.map((step, index) => {
                    return (
                        <div key={step.name}
                            ref={(el) => (stepRef.current[index] = el)}
                            className={`step ${currentStep > index + 1 || isCompleted ? "complete" : ""
                                } ${currentStep === index + 1 ? "active" : ""}`}
                        >
                            <div className="step-number">
                                {currentStep > index + 1 || isCompleted ? (
                                    <span>&#10003;</span>
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <div className="step-name">{step.name}</div>
                        </div>
                    )
                })}
                <div className="progress-bar"
                    style={{
                        width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`
                    }}
                >
                    <div className="progress"
                        style={{
                            width: `${calcuateWidth()}%`,
                            marginLeft: margins.marginLeft,
                            marginRight: margins.marginRight
                        }}
                    >

                    </div>
                </div>
            </div>

            <div className="component">
                <ActiveComponent />
            </div>

            {!isCompleted && (
                <button className="btn" onClick={handleNext}>
                    {currentStep === stepsConfig.length ? "Finish" : "Next"}
                </button>
            )}
        </>
    )
}

export default Stepper
