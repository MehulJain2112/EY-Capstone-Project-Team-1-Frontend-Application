import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Employee1 } from "../Charts/EmpPieChart/Employee1";
import { Employee2 } from "../Charts/EmpPieChart/Employee2";
import { Employee3 } from "../Charts/EmpPieChart/Employee3";
import { EmployeeOne } from "../EmployeDetails/EmployeeOne";
import { EmployeeTwo } from "../EmployeDetails/EmployeeTwo";
import { EmployeeThree } from "../EmployeDetails/EmployeeThree";

export function TabView() {
  return (
    <Tabs>
      <TabList>
        <Tab>Employee 1</Tab>
        <Tab>Employee 2</Tab>
        <Tab>Employee 3</Tab>
      </TabList>

      <TabPanel>
        <Employee1 />
        <EmployeeOne/>
      </TabPanel>
      <TabPanel>
        <Employee2 />
        <EmployeeTwo/>
      </TabPanel>
      <TabPanel>
      
        <Employee3 />
        <EmployeeThree/>
      </TabPanel>
    </Tabs>
  );
}
