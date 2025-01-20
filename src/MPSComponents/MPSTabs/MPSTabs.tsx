import React, { JSX } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { TabsProps } from "react-bootstrap/Tabs";

type TabsElement = TabsProps;

interface tabsDataArray {
  eventKey: string;
  title: string;
  content: JSX.Element;
}

interface MPSTabProps extends TabsElement {
  tabsData: tabsDataArray[];
}

export const MPSTabs = React.forwardRef<TabsElement, MPSTabProps>(
  ({ tabsData, ...props }) => {
    return (
      <Tabs className="mb-3" {...props}>
        {tabsData.map((item: any) => {
          return (
            <Tab eventKey={item.eventKey} title={item.title}>
              {item.content}
            </Tab>
          );
        })}
      </Tabs>
    );
  }
);

export default MPSTabs;
