import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "chartExample/charts";
import Card from "components/card";

const PieChartCard = (props: { count: any }) => {
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Group Findings By Severity
          </h4>
          <h4 className="text-sm text-gray-500">
            Group Findings By Severity that are on me
          </h4>
        </div>
      </div>

      <div className="mb-auto mt-3 flex h-[220px] w-full items-center justify-center">
        {(props.count.low > 0 || props.count.high > 0 || props.count.critical > 0 || props.count.medium > 0) && <PieChart chartOptions={pieChartOptions} chartData={pieChartData} count={props.count} />}
      </div>
      <div className="flex sm:flex-col flex-col md:flex-row  !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-4 w-10 bg-[#5dbb63]" />
            <p className="ml-1 text-sm font-bold text-black-600">Low ({props.count.low}%)</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-4 w-10 bg-[#f4c430]" />
            <p className="ml-1 text-sm font-bold text-black-600">High ({props.count.high}%)</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-4 w-10 bg-[#d67229]" />
            <p className="ml-1 text-sm font-bold text-black-600">Critical ({props.count.critical}%)</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-4 w-10 bg-[#9eecff]" />
            <p className="ml-1 text-sm font-bold text-black-600">Medium ({props.count.medium}%)</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PieChartCard;
