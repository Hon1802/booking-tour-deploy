import PlanCard from './PlanCard';
const plans = [
    {
        title: "Day 1",
        desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    },
    {
        title: "Day 2",
        desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    },
    {
        title: "Day 3",
        desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    },
    {
        title: "Day 4",
        desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    },
    {
        title: "Day 5",
        desc: "A small river named Duden flows by their place and supplies it with the necessary regelialia.",
    },
];
const TourPlan = ({ plan }) => {
    return (
        <>
            <div className="tourDetail-title">Tour Plan</div>
            {plan?.map((item, index) => {
                return (
                    <PlanCard
                        key={index}
                        title={item.time}
                        desc={item.description}
                    />
                );
            })}
        </>
    );
}
export default TourPlan;