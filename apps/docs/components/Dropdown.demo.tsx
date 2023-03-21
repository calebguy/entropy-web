import { Button, Dropdown, DropdownItem, Text } from "dsl";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const DropdownDemo = () => {
  return (
    <Demo title="Dropdown">
      <SubDemo>
        <Dropdown trigger={<Button>drop-it</Button>}>
          <DropdownItem>
            <Text>low</Text>
          </DropdownItem>
        </Dropdown>
      </SubDemo>
    </Demo>
  );
};

export default DropdownDemo;
