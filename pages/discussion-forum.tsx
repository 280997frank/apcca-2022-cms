import Layout from "@/components/Templates/Layout";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import TableDiscussion from "@/components/Templates/TableDiscussion";
import { useState } from "react";

const DiscussionForum = () => {
  const [typeForum, setTypeForm] = useState("WAITING");
  return (
    <Layout title="Discussion Forum" isPrivate>
      <VStack
        align="flex-start"
        padding={"10"}
        w="100%"
        border="1px solid #D7D7D7"
        borderRadius="16px"
        marginTop={"10"}
        background="#fff"
      >
        <Tabs variant="unstyled" w="100%">
          <TabList>
            <Tab
              _selected={{ color: "#222222", bg: "#FFDD00", borderRadius: 8 }}
              style={{ fontWeight: 700 }}
              onClick={() => setTypeForm("WAITING")}
            >
              Waiting for Approval
            </Tab>
            <Tab
              _selected={{ color: "#222222", bg: "#FFDD00", borderRadius: 8 }}
              style={{ fontWeight: 700 }}
              onClick={() => setTypeForm("ACTIVE")}
            >
              Active
            </Tab>
            <Tab
              _selected={{ color: "#222222", bg: "#FFDD00", borderRadius: 8 }}
              style={{ fontWeight: 700 }}
              onClick={() => setTypeForm("LOCKED")}
            >
              Locked
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <TableDiscussion type={typeForum} />
            </TabPanel>
            <TabPanel p={0}>
              <TableDiscussion type={typeForum} />
            </TabPanel>
            <TabPanel p={0}>
              <TableDiscussion type={typeForum} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Layout>
  );
};

export default DiscussionForum;
