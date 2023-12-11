import { Input, Col, Row, Label, Button, Form } from "reactstrap";
import { Controller, useForm } from "react-hook-form"
import { MuiTelInput } from 'mui-tel-input'
import React, { useEffect, useState } from "react"
import ReviewDetail from "./components/ReviewDetail"
const StepOne = ({ handleSetActiveStep, adultArray, setAdultArray, childrenArray, setChildrenArray }) => {
    const [phone, setPhone] = React.useState('')
    const state = JSON.parse(localStorage.getItem("state"))

    const handleChangePhone = (newPhone) => {
        setPhone(newPhone)
    }
    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        getValues
    } = useForm()

    const onSubmit = async (e) => {

        state?.numberAdult !== 0 && [...Array(state?.numberAdult)].map((_, i) => {
            setAdultArray([...adultArray, { firstName: getValues(`firstname${i + 1}`), lastName: getValues(`lastname${i + 1}`) }])
        });

        state?.numberChildren !== 0 && [...Array(state?.numberChildren)].map((_, i) => {
            setChildrenArray([...childrenArray, { firstName: getValues(`firstnameChild${i + 1}`), lastName: getValues(`lastnameChild${i + 1}`) }])
        })

        handleSetActiveStep(1, childrenArray, adultArray)
    }
    return (
        <div id="stepOne">
            <div className="wrapper">
                <Row>
                    <Col lg={7} sm={6} xs={12} className="mb-3">
                        <div className="title">
                            <h3>Contact Details</h3>
                            <p>We'll use this information to send you confirmation and updates about your booking. </p>

                            <Form id="form-submit" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col lg={12} sm={6} xs={12} className="mb-3">
                                        <Label for="email">
                                            Email <span className="text-danger">*</span>
                                        </Label>
                                        <Controller
                                            name="email"
                                            control={control}
                                            defaultValue={""}
                                            render={({ field }) => (
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    autoComplete="off"
                                                    autoFocus
                                                    {...register("email", {
                                                        required: true,
                                                        validate: (value) => value !== "" && !value?.includes(" ")
                                                    })}

                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors["email"] ? <p className="text-danger">Email is required</p> : null}
                                    </Col>
                                    <Col lg={12} sm={6} xs={12} >
                                        <Label for="phone">
                                            Phone number <span className="text-danger">*</span>
                                        </Label>
                                    </Col>
                                    <Col lg={12} sm={6} xs={12} className="mb-3">
                                        <Controller
                                            name="phone"
                                            control={control}
                                            defaultValue={""}
                                            render={({ field }) => (
                                                <MuiTelInput
                                                    {...field}
                                                    defaultCountry="VN"
                                                    value={phone}
                                                    onChange={handleChangePhone} />
                                            )}
                                        />
                                    </Col>
                                    <Label for="list">
                                        <h3>Traveler list</h3>
                                    </Label>
                                    {state?.numberAdult !== 0 &&
                                        <Col lg={12} sm={6} xs={12} className="mb-3">
                                            <div className="text-center tag">
                                                <Label for="list">
                                                    Adult
                                                </Label>
                                            </div>
                                            {[...Array(state?.numberAdult)].map((_, i) => {
                                                return (
                                                    <Row key={i}>
                                                        <p>Traveler {i + 1}</p>
                                                        <Col lg={6} sm={6} xs={12} className="mb-3">
                                                            <Label for={`firstname${i + 1}`}>
                                                                First Name <span className="text-danger">*</span>
                                                            </Label>
                                                            <Controller
                                                                name={`firstname${i + 1}`}
                                                                control={control}
                                                                defaultValue={""}
                                                                render={({ field }) => (
                                                                    <Input
                                                                        id={`firstname${i + 1}`}
                                                                        autoComplete="off"
                                                                        autoFocus
                                                                        {...register(`firstname${i + 1}`, {
                                                                            required: true,
                                                                            validate: (value) => value !== "" && !value?.includes(" ")
                                                                        })}
                                                                        {...field}
                                                                    />
                                                                )}
                                                            />
                                                            {errors[`firstname${i + 1}`] ? <p className="text-danger">First name is required</p> : null}
                                                        </Col>
                                                        <Col lg={6} sm={6} xs={12} className="mb-3">
                                                            <Label for={`lastname${i + 1}`}>
                                                                Last Name <span className="text-danger">*</span>
                                                            </Label>
                                                            <Controller
                                                                name={`lastname${i + 1}`}
                                                                control={control}
                                                                defaultValue={""}
                                                                render={({ field }) => (
                                                                    <Input
                                                                        id={`lastname${i + 1}`}
                                                                        autoComplete="off"
                                                                        autoFocus
                                                                        {...register(`lastname${i + 1}`, {
                                                                            required: true,
                                                                            validate: (value) => value !== "" && !value?.includes(" ")
                                                                        })}
                                                                        {...field}
                                                                    />
                                                                )}
                                                            />
                                                            {errors[`lastname${i + 1}`] ? <p className="text-danger">Last name is required</p> : null}
                                                        </Col>
                                                    </Row>
                                                )
                                            })}
                                        </Col>
                                    }
                                    {state?.numberChildren !== 0 &&
                                        <Col lg={12} sm={6} xs={12} className="mb-3">
                                            <div className="text-center tag">
                                                <Label for="list">
                                                    Children
                                                </Label>
                                            </div>
                                            {[...Array(state?.numberChildren)].map((_, i) => {
                                                return (
                                                    <Row key={i}>
                                                        <p>Traveler {i + 1}</p>
                                                        <Col lg={6} sm={6} xs={12} className="mb-3">
                                                            <Label for={`firstnameChild${i + 1}`}>
                                                                First Name <span className="text-danger">*</span>
                                                            </Label>
                                                            <Controller
                                                                name={`firstnameChild${i + 1}`}
                                                                control={control}
                                                                defaultValue={""}
                                                                render={({ field }) => (
                                                                    <Input
                                                                        id={`firstnameChild${i + 1}`}
                                                                        autoComplete="off"
                                                                        autoFocus
                                                                        {...register(`firstnameChild${i + 1}`, {
                                                                            required: true,
                                                                            validate: (value) => value !== "" && !value?.includes(" ")
                                                                        })}
                                                                        {...field}
                                                                    />
                                                                )}
                                                            />
                                                            {errors[`firstnameChild${i + 1}`] ? <p className="text-danger">First name is required</p> : null}
                                                        </Col>
                                                        <Col lg={6} sm={6} xs={12} className="mb-3">
                                                            <Label for={`lastnameChild${i + 1}`}>
                                                                Last Name <span className="text-danger">*</span>
                                                            </Label>
                                                            <Controller
                                                                name={`lastnameChild${i + 1}`}
                                                                control={control}
                                                                defaultValue={""}
                                                                render={({ field }) => (
                                                                    <Input
                                                                        id={`lastnameChild${i + 1}`}
                                                                        autoComplete="off"
                                                                        autoFocus
                                                                        {...register(`lastnameChild${i + 1}`, {
                                                                            required: true,
                                                                            validate: (value) => value !== "" && !value?.includes(" ")
                                                                        })}
                                                                        {...field}
                                                                    />
                                                                )}
                                                            />
                                                            {errors[`lastnameChild${i + 1}`] ? <p className="text-danger">Last name is required</p> : null}

                                                        </Col>
                                                    </Row>
                                                )
                                            })}
                                        </Col>
                                    }

                                    <Col lg={12} sm={6} xs={12} className="mb-3 d-flex justify-content-center">
                                        <Button className="btn-submit" type="submit" variant="contained">Next</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                    <Col lg={5} sm={6} xs={12} className="mb-3">
                        <ReviewDetail />
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default StepOne