import {
  Button,
  ButtonIntent,
  ButtonSize,
  Dropdown,
  DropdownItem,
  Text,
} from "dsl";
import Demo from "./Demo";
import SubDemo from "./SubDemo";

const DropdownDemo = () => {
  return (
    <Demo title="Dropdown">
      <SubDemo>
        <Dropdown
          trigger={
            <Button size={ButtonSize.Sm} intent={ButtonIntent.Secondary}>
              click me
            </Button>
          }
        >
          <DropdownItem>
            <Text>✅ inter</Text>
          </DropdownItem>
          <DropdownItem>
            <Text>✅ connected</Text>
          </DropdownItem>
        </Dropdown>
      </SubDemo>
    </Demo>
  );
};

export default DropdownDemo;
