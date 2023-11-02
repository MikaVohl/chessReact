import {
    Box, Button, Fade, Heading, useDisclosure, useOutsideClick, VStack, Wrap,
  } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function HomePage() {

return (
<VStack gap="40px">
    <Heading size="3xl">Chess</Heading>
    <Wrap spacing="40px" justify="center">
        <Button as={Link} to="/chess/computer">Play against the computer</Button>
        <Button as={Link} to="/chess/local">Take turns</Button>
    </Wrap>
</VStack>
);
}

export { HomePage };
