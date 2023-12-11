export const regionOptions = [
    {
        label: "All", value: ""
    },
    {
        label: "Northern Vietnam", value: "Northern Vietnam"
    },
    {
        label: "Central Vietnam", value: "Central Vietnam"
    },
    {
        label: "Southern Vietnam", value: "Southern Vietnam"
    }
]
export const durationOptions = [
    {
        label: "All", value: ""
    },
    {
        label: "In day", value: "single"
    },
    {
        label: "Long day", value: "multiple"
    }
]

export const renderDurationOptions = (value) => {
    switch (value) {
        case "single":
            return "In day";
        case "multiple":
            return "Long day";
    }
}
