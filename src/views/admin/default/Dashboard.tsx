
import PieChartCard from "views/admin/default/components/PieChartCard";
import GroupFinding from "../tables/components/GroupFinding";
import React, { useEffect, useState } from "react";
import Loader from "views/admin/default/components/Loader";
import { getAllGroupData, getAllRawData } from "services/finding";
import './../../../index.css';


const Dashboard = () => {
  const [groupList, setGroupList] = useState([]);
  const [rawList, setRawList] = useState([]);
  const [mergedArray, setMergedArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState({ low: 0, medium: 0, critical: 0, high: 0, total: 0 });

  useEffect(() => {
    // Api fetch
    getGroupData()
  }, [])

  const getGroupData = async () => {
    // get group data
    await getAllGroupData().then((res: any) => res.json())
      .then(async (result: any) => {
        setGroupList(result)
        if (result.length > 0) {
          // pie chart calculation
          let low = 0, medium = 0, critical = 0, high = 0;
          await result.map((item: any,index:number) => {
            if (item.severity === 'low') {
              low++;
            } else if (item.severity === 'high') {
              high++;
            } else if (item.severity === 'critical') {
              critical++;
            } else if (item.severity === 'medium') {
              medium++;
            }
          })
          const total = result.length; // Specify the total value
          let obj: any = { low: low, medium: medium, critical: critical, high: high, total: result.length }
          const percentages: any = {};

          for (const severity in obj) {
            if (obj.hasOwnProperty(severity)) {
              percentages[severity] = ((obj[severity] / total) * 100).toFixed(0);
            }
          }
          setCount({ low: Number(percentages.low), medium: Number(percentages.medium), critical: Number(percentages.critical), high: Number(percentages.high), total: result.length })
        }

        // get raw data
        await getAllRawData().then((resData: any) => resData.json())
          .then(async (resultData: any) => {
            setRawList(resultData)
            let newArray: any = []
            // matching with group id
            await result.map((item1: any) => {
              const item2 = resultData.filter((item: any) => item.grouped_finding_id === item1.id);
              if (item2 && item2.length > 0) {
                newArray.push({ group: item1, raw: item2, matched: true })
              } else {
                newArray.push({ group: item1, matched: true })
              }
              return item1; // If no matching item is found in array2, keep the original item from array1
            });
            setMergedArray(newArray)
            setIsLoading(false);
          })
          .catch((err: any) => {
            setIsLoading(false);
          });
      })
      .catch((err: any) => {
        setIsLoading(false);
      });
  }

  return (
    <div>

      <div>
        {/* group table */}
        <div className="mt-5 grid h-full">
          <GroupFinding rawList={rawList} groupList={groupList} mergedArray={mergedArray} />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5">
          {/* pi chart */}
          <div className="grid grid-cols-1 gap-5 rounded-[20px]">
            <PieChartCard count={count} />
          </div>
        </div>
      </div>
      <div className="loader-css">
        {/* loader */}
        {isLoading && <Loader loading={isLoading} />}
      </div>
    </div>
  );
};

export default Dashboard;
