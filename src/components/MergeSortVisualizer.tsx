"use client";

import { useState } from "react";
import ArrayBar from "./ArrayBar";
import { motion } from "framer-motion";

type Segment = { array: number[]; color: string };

export default function MergeSortVisualizer() {
  const [inputValue, setInputValue] = useState<string>("");
  const [arrayGroups, setArrayGroups] = useState<Segment[][]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const mergeArrays = (left: number[], right: number[]) => {
    const merged: number[] = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        merged.push(left[i]);
        i++;
      } else {
        merged.push(right[j]);
        j++;
      }
    }

    while (i < left.length) merged.push(left[i++]);
    while (j < right.length) merged.push(right[j++]);

    return merged;
  };

  const handleStartSort = () => {
    var nums = inputValue
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n));

    const groups: Segment[][] = [];

    const divide = (arr: number[], depth: number, isLeft: boolean) => {
      if (!arr.length) return;

      const color = isLeft ? "green" : "red";

      if (!groups[depth]) groups[depth] = [];
      groups[depth].push({ array: arr, color });

      if (arr.length === 1) return;

      const mid = Math.floor(arr.length / 2);
      divide(arr.slice(0, mid), depth + 1, true);
      divide(arr.slice(mid), depth + 1, false);
    };

    groups[0] = [{ array: nums, color: "gray" }];
    divide(nums, 1, true);

    let currentGroups = groups[groups.length - 1];
    let colorToggle = true;

    while (currentGroups.length > 1) {
      const nextGroups: Segment[] = [];
      colorToggle = true;

      for (let i = 0; i < currentGroups.length; i += 2) {
        if (i + 1 < currentGroups.length) {
          const leftArr = currentGroups[i].array;
          const rightArr = currentGroups[i + 1].array;

          const mergedArray = mergeArrays(leftArr, rightArr);

          nextGroups.push({
            array: mergedArray,
            color: colorToggle ? "green" : "red",
          });

          colorToggle = !colorToggle;
        } else {
          nextGroups.push({
            ...currentGroups[i],
            color: colorToggle ? "green" : "red",
          });
          colorToggle = !colorToggle;
        }
      }

      groups.push(nextGroups);
      currentGroups = nextGroups;
    }


    setArrayGroups(groups);
    console.log("Divide + Conquer groups with colors:", groups);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <input
          type="text"
          placeholder="Enter numbers separated by commas"
          value={inputValue}
          onChange={handleInputChange}
          className="w-[200px] h-[30px] "
        />
        <button
          onClick={handleStartSort}
          className="w-[80px] h-[30px]"
        >
          Start Sort
        </button>
      </div>
      <br />
      {arrayGroups.length > 0 && (
        <div className="flex flex-col  gap-[12px]">
          {arrayGroups.map((depth, depthIdx) => (
            <motion.div
              key={depthIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: depthIdx * 2 , duration: 1 }}
            >
              <div key={depthIdx} className="flex justify-center">
                {depth.map((segment, segIdx) => (
                  <ArrayBar key={segIdx} array={segment.array} color={segment.color}  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}


