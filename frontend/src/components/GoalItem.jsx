const GoalItem = ({ goal }) => {
  console.log(goal);
  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toDateString("en-US")}</div>
      <h2>{goal.text}</h2>
    </div>
  );
};

export default GoalItem;
