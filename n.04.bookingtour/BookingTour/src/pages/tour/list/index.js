import Banner from '../../../components/Banner'
import { banner } from '../../../assets'
import Card from "./Card"
import { regionOptions, durationOptions, renderDurationOptions } from '../../../constants/region-constant'
import Select from 'react-select'
import { Input, Row, Col, Label, FormGroup } from 'reactstrap'
import { Button } from '@mui/material'
import Pagination from '@mui/material/Pagination';
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import { getTourList } from "../store/action"
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
const CustomHeader = ({
    searchTermFrom,
    searchTermTo,
    handleSearchFrom,
    handleSearchTo,
    budget,
    duration,
    handleFilter,
    region,
    setRegion,
    setDuration,
    setBudget
}) => {
    return (
        <div className="header-wrapper my-4">
            <Row>
                <Col lg={3} sm={6} xs={12} className="mb-3">
                    <FormGroup>
                        <Label for="from">
                            From
                        </Label>
                        <Input
                            id="from"
                            placeholder={"Enter destination"}
                            value={searchTermFrom}
                            onChange={(e) => {
                                handleSearchFrom(e.target.value)
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col lg={3} sm={6} xs={12} className="mb-3">
                    <FormGroup>
                        <Label for="to">
                            To
                        </Label>
                        <Input
                            id="to"
                            placeholder={"Enter destination"}
                            value={searchTermTo}
                            onChange={(e) => {
                                handleSearchTo(e.target.value)
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col lg={3} sm={6} xs={12} className="mb-3">
                    <FormGroup>
                        <Label for="region">
                            Region
                        </Label>
                        <Select
                            id="region"
                            placeholder={region || "Select region"}
                            style={{ minWidth: "100%" }}
                            classNamePrefix="select"
                            options={regionOptions}
                            isClearable={false}
                            onChange={({ value }) => setRegion(value)}
                        />

                    </FormGroup>
                </Col>
                <Col lg={3} sm={6} xs={12} className="mb-3">
                    <FormGroup>
                        <Label for="price">
                            Duration type
                        </Label>
                        <Select
                            id="region"
                            placeholder={renderDurationOptions(duration) || "Select duration type"}
                            style={{ minWidth: "100%" }}
                            classNamePrefix="select"
                            options={durationOptions}
                            isClearable={false}
                            onChange={({ value }) => setDuration(value)}
                        />

                    </FormGroup>
                </Col>
                <Col lg={3} sm={6} xs={12} className="mb-3">
                    <FormGroup>
                        <Label for="price">
                            Budget
                        </Label>
                        <Input
                            type='number'
                            id="price"
                            placeholder={"Budget"}
                            value={budget}
                            onChange={(e) => {
                                setBudget(e.target.value)
                            }}
                        />
                    </FormGroup>
                </Col>
                <Col lg={3} sm={6} xs={12} className="mb-3">
                    <FormControl>
                        <Label for="btn" style={{ visibility: "hidden" }}>
                            dasd
                        </Label>
                        <Button id="btn" variant="contained" type="submit" onClick={handleFilter}>Search</Button>
                    </FormControl>
                </Col>
            </Row>

        </div >
    )
}
const TourList = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()
    const store = useSelector((state) => state.tour)
    const [loading, setLoading] = useState(false)
    const [searchTermFrom, setSearchTermFrom] = useState(searchParams?.get("keywordFrom") ? searchParams?.get("keywordFrom") : "")
    const [searchTermTo, setSearchTermTo] = useState(searchParams?.get("keywordTo") ? searchParams?.get("keywordTo") : "")
    const [budget, setBudget] = useState(searchParams?.get("budget") ? searchParams?.get("budget") : "")
    const [duration, setDuration] = useState(searchParams?.get("durationType") ? searchParams?.get("durationType") : "")
    const [region, setRegion] = useState(searchParams?.get("region") ? searchParams?.get("region") : "")
    const [searchTerm, setSearchTerm] = useState(searchParams?.get("keyword") ? searchParams?.get("keyword") : "")
    const pageSize = 8
    const [pagination, setPagination] = useState({
        count: 0,
        fromPage: 0,
        toPage: pageSize,
    })

    useEffect(() => {
        getData()
    }, [pagination.fromPage, pagination.toPage, pagination.count, searchParams])
    const getData = async () => {
        setLoading(true)
        await dispatch(
            getTourList({
                fromPage: pagination.fromPage,
                toPage: pagination.toPage,
                from: searchTermFrom || null,
                to: searchTermTo || null,
                durationType: duration,
                region: region,
                budget: budget,
                name: searchTerm
            })
        )
        const count = store?.total
        setPagination({
            ...pagination, count: count
        })

        setLoading(false)
    }
    const handleSearchFrom = (value) => {
        setSearchTermFrom(value)
    }
    const handleSearchTo = (value) => {
        setSearchTermTo(value)
    }
    const checkParams = (filterParams) => {
        const params = {}

        if (filterParams.keywordFrom) {
            params.keywordFrom = filterParams.keywordFrom
        }
        if (filterParams.keyword) {
            params.keyword = filterParams.keyword
        }
        if (filterParams.keywordTo) {
            params.keywordTo = filterParams.keywordTo
        }
        if (filterParams.budget) {
            params.budget = filterParams.budget
        }

        if (filterParams.durationType) {
            params.durationType = filterParams.durationType
        }
        if (filterParams.region) {
            params.region = filterParams.region
        }

        setSearchParams(params)
    }
    const handleFilter = () => {
        checkParams({
            keywordFrom: searchTermFrom,
            keywordTo: searchTermTo,
            budget: budget,
            durationType: duration,
            region: region,
            name: searchTerm
        })
    }

    const handlePageChange = (event, page) => {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize

        setPagination({
            ...pagination,
            fromPage: from,
            toPage: to
        })
    }
    return (
        <div id="tourList">
            <Banner title="Tours" subtitle="Tours" banner={banner} />
            <div className='container'>
                <CustomHeader
                    handleSearchFrom={handleSearchFrom}
                    searchTermFrom={searchTermFrom}
                    handleSearchTo={handleSearchTo}
                    searchTermTo={searchTermTo}
                    budget={budget}
                    duration={duration}
                    setBudget={setBudget}
                    setDuration={setDuration}
                    setRegion={setRegion}
                    handleFilter={handleFilter}
                    region={region}
                />
                <div className='box-container row mx-0'>
                    {store?.listTour && store?.listTour?.map((item, index) => {
                        return (
                            <Col lg={3} sm={6} xs={12} className="mb-3">
                                <Card key={index} item={item} />
                            </Col>
                        )
                    })}
                </div>
                <Pagination
                    className='d-flex justify-content-center my-3'
                    count={Math.ceil(pagination.count / pageSize)}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded" />
            </div>
        </div>
    )
}
export default TourList