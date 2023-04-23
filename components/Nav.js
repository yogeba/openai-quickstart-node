import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100%"
      zIndex="999"
      bg={bg}
      color={color}
      boxShadow="sm"
    >
      <Flex justify="space-between" align="center" px={4} py={3}>
        <Box>
          <img src="/logo.png" alt="Logo" />
        </Box>
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
          color={color}
          aria-label="Toggle menu"
        />
        <Flex
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
          w="full"
          maxW="4xl"
        >
          <Box ml={10} mr={5}>
            <a href="#what-we-do">What We Do</a>
          </Box>
          <Box mr={5}>
            <a href="#why-choose-us">Why Choose Us</a>
          </Box>
          <Box mr={5}>
            <a href="#our-team">Our Team</a>
          </Box>
          <Box mr={5}>
            <a href="#contact-us">Contact Us</a>
          </Box>
        </Flex>
        <Flex alignItems="center">
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? "moon" : "sun"}
            onClick={toggleColorMode}
            variant="ghost"
            mr={3}
          />
        </Flex>
      </Flex>
      {isOpen && (
        <Box pb={4}>
          <Box
            bg={bg}
            w="full"
            px={4}
            display={{ md: "none" }}
            alignItems="center"
          >
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Box>
                <img src="/logo.png" alt="Logo" />
              </Box>
              <IconButton
                icon={<CloseIcon />}
                onClick={onClose}
                variant="ghost"
                color={color}
                aria-label="Toggle menu"
              />
            </Box>
            <Box mb={2}>
              <Box mb={2}>
                <a href="#what-we-do">What We Do</a>
              </Box>
              <Box mb={2}>
                <a href="#why-choose-us">Why Choose Us</a>
              </Box>
              <Box mb={2}>
                <a href="#our-team">Our Team</a>
              </Box>
              <Box mb={2}>
                <a href="#contact-us">Contact Us</a>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Nav;
