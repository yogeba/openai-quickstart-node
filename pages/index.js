// pages/index.js
import {
  Box,
  VStack,
  Heading,
  Text,
  FormControl,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Nav from "../components/Nav";

export default function Home() {
  const [healthInput, setHealthInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ health: healthInput }),
      });

      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      let results;
      if (Array.isArray(data.result)) {
        results = data.result;
      } else {
        results = JSON.parse(data.result);
      }

      const elements = results.map((item, index) => (
        <Box key={index}>
          <Heading size="md" marginBottom="2">
            {item.Question}
          </Heading>
          <Text>{item.Answer}</Text>
        </Box>
      ));

      setResult(elements);
      setHealthInput("");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  }

  return (
    <VStack spacing="4" align="center">
      <Nav />
      <Heading as="h3" size="lg">
        Self-evaluate your optimal health needs
      </Heading>
      <FormControl as="form" width="100%" maxWidth="40em" onSubmit={onSubmit}>
        <Input
          type="text"
          name="health"
          placeholder="Enter a health condition, symptom, disease, or outcome"
          value={healthInput}
          onChange={(e) => setHealthInput(e.target.value)}
          marginBottom="4"
        />
        <Button type="submit" isLoading={loading} colorScheme="blue">
          Generate
        </Button>
      </FormControl>
      <VStack spacing="6" align="start" width="100%" maxWidth="40em">
        {result}
      </VStack>
    </VStack>
  );
}
