import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import propTypes from "prop-types";
import "../css/components/LineChart.css";

export default function ComponentLineChart({ data }) {
  ComponentLineChart.propTypes = {
    data: propTypes.array.isRequired,
  };

  const dayNames = ["L", "M", "M", "J", "V", "S", "D"];

  let before = 0;
  let after = 0;

  data[0].sessionLength > data[1].sessionLength
    ? (before = data[0].sessionLength - data[1].sessionLength)
    : (before = data[1].sessionLength - data[0].sessionLength);

  data[5].sessionLength > data[6].sessionLength
    ? (after = data[5].sessionLength - data[6].sessionLength)
    : (after = data[6].sessionLength - data[5].sessionLength);

  // console.log(data);

  const extendedData = [
    { day: 0, sessionLength: before },
    ...data,
    { day: 8, sessionLength: after },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const isSunday = payload[0].payload.day === 7;
      const tooltipClassName = isSunday ? "custom-tooltip-left" : "";
      return (
        <div className={`custom-tooltip line-chart ${tooltipClassName}`}>
          <div className="custom-tooltip-box">{`${payload[0].value} min`}</div>
        </div>
      );
    }
    return null;
  };

  CustomTooltip.propTypes = {
    active: propTypes.bool,
    payload: propTypes.array,
  };

  return (
    <div className="line-graph">
      <h2 className="line-graph-title">Durée moyenne des sessions</h2>
      <ResponsiveContainer width="135%" height="80%">
        <LineChart data={extendedData}>
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis
            dataKey="day"
            tickFormatter={(day) => dayNames[day - 1]}
            axisLine={false}
            tickSize={0}
            tickMargin={0}
            padding={{ left: 20, right: 20 }}
            tick={{ fill: "#FFF" }}
            domain={[1, 7]} // Plage des jours de 1 à 7
            ticks={[1, 2, 3, 4, 5, 6, 7]} // Jours à afficher sur l'axe
          />
          <YAxis
            hide
            type="number"
            domain={[(dataMin) => dataMin - 20, (dataMax) => dataMax + 20]}
          />
          <Tooltip
            content={CustomTooltip}
            contentStyle={{ background: "#fff", color: "#000" }}
            cursor={false}
            position="left"
          />
          <Line
            type="natural"
            dataKey="sessionLength"
            name="Durée"
            dot={false}
            activeDot={{ r: 4 }}
            stroke="#fff"
            strokeWidth={2}
            strokeOpacity={0.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
